import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';

import { SharedModule } from './shared/shared.module';
import { UserRoutingModule } from './user-routing.module';

import { UserAddComponent } from './user-add/user-add.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    SharedModule,
    UserRoutingModule
  ],
  declarations: [ UserAddComponent ],
  exports: [ UserAddComponent ]
})
export class UserModule { }