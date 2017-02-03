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
  chartData: Array<number[]>;
  chartLabels: Array<any>;
  unit: Unit;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private unitStatusService: UnitStatusService,
    private unitService: UnitService
  ) {
    this.statusData = new UnitStatus;
    this.chartData = [[]];
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
        console.log("Updating live!");
        if (!this.statusData || data._id !== this.statusData._id) {
          this.chartData[0].push(data.acceleration);
          this.chartLabels.push(this.formatDate(new Date(data.createdAt)));
          if (this.chartData.length > 5) {
            this.chartData.shift();
            this.chartLabels.shift();
          }
          this.statusPicturePath = environment.baseURL + data.picture.url;
          this.statusData = data;
        }
    });
  }

}
