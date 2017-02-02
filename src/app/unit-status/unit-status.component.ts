import { Component, Input, OnInit } from '@angular/core';

import { UnitStatusService } from '../unit-status.service';
import { UnitStatus } from '../unit-status';

@Component({
  selector: 'app-unit-status',
  templateUrl: './unit-status.component.html',
  styleUrls: ['./unit-status.component.css']
})
export class UnitStatusComponent implements OnInit {
  @Input() unitId: string;
  statusData: string;

  constructor(
    private unitStatusService: UnitStatusService
  ) { }

  ngOnInit() {
    this.unitStatusService.getLiveStatusData(this.unitId).subscribe(data => {
      console.log("Updating live!");
      this.statusData = JSON.stringify(data);
    });
  }

}
