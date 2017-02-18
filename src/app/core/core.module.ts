import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { RouterModule } from '@angular/router';

import { AuthGuard } from './auth.guard';

import { AuthService } from './auth.service';
import { UnitService } from './unit.service';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    MaterialModule,
    RouterModule
  ],
  declarations: [
    HomeComponent,
    LoginComponent,
    NavbarComponent
  ],
  exports: [
    HomeComponent,
    LoginComponent,
    NavbarComponent
  ],
  providers: [
    AuthGuard,
    AuthService,
    UnitService
  ]
})
export class CoreModule { }