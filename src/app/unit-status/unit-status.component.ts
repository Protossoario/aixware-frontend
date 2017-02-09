import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';

import { environment } from '../../environments/environment';

import { GeocodeService } from '../geocode.service';
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
  address = '';
  chartData: number[]; 
  chartLabels: Array<any>;
  statusData: UnitStatus;
  statusPicturePath: string;
  unit: Unit;

  constructor(
    private geocodeService: GeocodeService,
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
      .flatMap((unit: Unit) => {
        this.unit = unit;
        return this.unitStatusService.getLiveStatusData(unit._id)
      })
      .flatMap((data: UnitStatus) => {
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
        return this.geocodeService.getAddress(data.latitude, data.longitude);
      })
      .subscribe((address: string) => {
        this.address = address;
      });
  }

}
