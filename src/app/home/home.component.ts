import { Component, OnInit } from '@angular/core';

import { User } from '../user';
import { Unit } from '../unit';
import { UserService } from '../user.service';
import { UnitService } from '../unit.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  users: User[] = [];
  units: Unit[] = [];

  constructor(
    private userService: UserService,
    private unitService: UnitService) { }

  ngOnInit() {
    this.userService.getUsers()
      .subscribe(users => {
        this.users = users;
      });
    this.unitService.units.subscribe(units => this.units = units);
  }

  onEdit(unit: Unit) {
    // TODO
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
