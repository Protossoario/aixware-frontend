import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Unit } from '../unit';
import { UnitService } from '../unit.service';

@Component({
  selector: 'app-unit-add',
  templateUrl: './unit-add.component.html',
  styleUrls: ['./unit-add.component.css']
})
export class UnitAddComponent implements OnInit {
  submitted = false;
  model = new Unit();
  errMsg = '';

  constructor(
    private router: Router,
    private unitService: UnitService) { }

  ngOnInit() {
  }

  onSubmit() {
    this.submitted = true;
    this.unitService.create(this.model)
      .subscribe((data) => {
        this.submitted = false;
        this.router.navigate(['/']);
      }, (err) => {
        this.errMsg = err;
      })
  }

}
