import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';

import { Unit } from '../unit';
import { UnitService } from '../unit.service';

@Component({
  selector: 'app-unit-edit',
  templateUrl: './unit-edit.component.html',
  styleUrls: ['./unit-edit.component.css']
})
export class UnitEditComponent implements OnInit {
  submitted = false;
  model = new Unit;
  errMsg = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private unitService: UnitService) { }

  ngOnInit() {
    this.route.params
      .switchMap((params: Params) => this.unitService.getUnit(params['id']))
      .subscribe(unit => this.model = unit);
  }

  onSubmit() {
    this.submitted = true;
    this.unitService.update(this.model)
      .subscribe(() => {
        this.router.navigate(['/']);
      }, (err) => {
        this.submitted = false;
        this.errMsg = err;
      });
  }

}
