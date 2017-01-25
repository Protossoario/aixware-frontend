import { Component, OnInit, OnDestroy } from '@angular/core';
import { UnitStatusService } from '../unit-status.service';

@Component({
  selector: 'app-unit-status',
  templateUrl: './unit-status.component.html',
  styleUrls: ['./unit-status.component.css']
})
export class UnitStatusComponent implements OnInit, OnDestroy {
  connection;
  statusData;

  constructor(
    private unitStatusService: UnitStatusService
  ) { }

  ngOnInit() {
    this.connection = this.unitStatusService.getStatus().subscribe(data => {
      this.statusData = data;
    });
  }

  ngOnDestroy() {
    this.connection.unsubscribe();
  }

}
