import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../../_models/user';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent implements OnInit {
  submitted = false;
  model = new User;
  errMsg = '';

  constructor(
    private router: Router,
    private userService: UserService) { }

  ngOnInit() {
  }

  onSubmit() {
    if (this.model.password !== this.model.confirmPassword) {
      this.errMsg = 'Verifique la confirmación de su contraseña.';
      return;
    }
    this.submitted = true;
    this.userService.create(this.model)
      .subscribe(() => {
        this.router.navigate(['/']);
      }, (err) => {
        this.submitted = false;
        this.errMsg = err;
      });
  }

}
