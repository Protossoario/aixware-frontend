import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';

import { environment } from '../../environments/environment';

import { UnitStatusService } from '../unit-status.service';
import { UnitService } from '../unit.service';
import { UnitStatus } from '../unit-status';
import { Unit } from '../unit';

@Component({
  selector: 'app-unit-status',
  templateUrl: './unit-status.component.html',
  styleUrls: ['./unit-status.component.css']
})
export class UnitStatusComponent implements OnInit {
  statusData: UnitStatus;
  statusPicturePath: string;
  chartData: number[]; 
  chartLabels: Array<any>;
  unit: Unit;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private unitStatusService: UnitStatusService,
    private unitService: UnitService
  ) {
    this.statusData = new UnitStatus;
    this.chartData = [];
    this.chartLabels = [];
  }

  formatDate(date: Date): string {
    return date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
  }

  ngOnInit() {
    this.route.params
      .switchMap((params: Params) => this.unitService.getUnit(params['id']) )
      .flatMap((unit) => {
        this.unit = unit;
        return this.unitStatusService.getLiveStatusData(unit._id)
      })
      .subscribe(data => {
        if (!this.statusData || data._id !== this.statusData._id) {
          this.chartData.push(data.acceleration);
          this.chartLabels.push(this.formatDate(new Date(data.createdAt)));
          if (this.chartLabels.length > 5) {
            this.chartData = this.chartData.slice(1);
            this.chartLabels = this.chartLabels.slice(1);
          } else {
            this.chartData = this.chartData.slice();
            this.chartLabels = this.chartLabels.slice();
          }
          this.statusPicturePath = environment.baseURL + data.picture.url;
          this.statusData = data;
        }
    });
  }

}
