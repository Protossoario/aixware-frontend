import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';

import { Unit } from '../unit';
import { UnitService } from '../unit.service';

@Component({
  selector: 'app-unit-list',
  templateUrl: './unit-list.component.html',
  styleUrls: ['./unit-list.component.css']
})
export class UnitListComponent implements OnInit {
  units: Unit[] = [];
  selectedId: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private unitService: UnitService) { }

  ngOnInit() {
    this.route.params
      .switchMap((params: Params) => {
        this.selectedId = params['id'];
        return this.unitService.units;
      })
      .subscribe((units) => {
        this.units = units;
      });
    this.unitService.loadAll();
  }

  onSelect(unit: Unit) {
    this.router.navigate([ '/unidad', unit._id ]);
  }
}
