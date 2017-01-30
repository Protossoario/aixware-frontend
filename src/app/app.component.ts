import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { AuthService } from './auth.service';
import { User } from './user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  currentUser: User;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.subscription = this.authService.currentUser$
      .subscribe((user) => this.currentUser = user)
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
