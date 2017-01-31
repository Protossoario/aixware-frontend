import { Component, OnInit } from '@angular/core';

import { Unit } from '../unit';
import { UnitService } from '../unit.service';

@Component({
  selector: 'app-unit-list',
  templateUrl: './unit-list.component.html',
  styleUrls: ['./unit-list.component.css']
})
export class UnitListComponent implements OnInit {
  units: Unit[] = [];

  constructor(private unitService: UnitService) { }

  ngOnInit() {
    this.unitService.units
      .subscribe((units) => {
        this.units = units;
      });
    this.unitService.loadAll();
  }

}
