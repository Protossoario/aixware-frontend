import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Unit } from '../../_models/unit';
import { UnitService } from '../unit.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  units: Unit[] = [];

  constructor(
    private router: Router,
    private unitService: UnitService) { }

  ngOnInit() {
    this.unitService.units.subscribe(units => this.units = units);
  }

  onEdit(unit: Unit) {
    this.router.navigate([ '/unidades', unit._id ]);
  }

  onDelete(unit: Unit) {
    this.unitService.delete(unit)
      .subscribe(() => {
        console.log('Unit deleted');
      }, (err) => {
        console.error(err);
      });
  }
}
