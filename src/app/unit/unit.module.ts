import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';
import { RouterModule } from '@angular/router';

// Chart.js module for Angular2
import { ChartsModule } from 'ng2-charts';

// Google Maps for Angular2
import { AgmCoreModule } from 'angular2-google-maps/core';

import { UnitRoutingModule } from './unit-routing.module';

import { GeocodeService } from './unit-status/geocode.service';
import { UnitStatusService } from './unit-status/unit-status.service';

import { UnitFilterPipe } from './unit-list/unit-filter.pipe';

import { UnitAddComponent } from './unit-add/unit-add.component';
import { UnitEditComponent } from './unit-edit/unit-edit.component';
import { UnitListComponent } from './unit-list/unit-list.component';
import { UnitStatusComponent } from './unit-status/unit-status.component';

@NgModule({
  imports: [
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCEc9SudbT0HNHF1oHsIcsubDo0jbvwgLs',
      libraries: ['places']
    }),
    ChartsModule,
    CommonModule,
    FormsModule,
    MaterialModule,
    RouterModule,
    UnitRoutingModule
  ],
  declarations: [
    UnitAddComponent,
    UnitEditComponent,
    UnitFilterPipe,
    UnitListComponent,
    UnitStatusComponent
  ],
  exports: [
    UnitListComponent
  ],
  providers: [
    GeocodeService,
    UnitStatusService
  ]
})
export class UnitModule { }