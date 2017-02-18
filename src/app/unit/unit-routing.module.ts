import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UnitAddComponent } from './unit-add/unit-add.component';
import { UnitEditComponent } from './unit-edit/unit-edit.component';
import { UnitStatusComponent } from './unit-status/unit-status.component';

export const unitRoutes: Routes = [
  { path: '', component: UnitAddComponent },
  { path: ':id', component: UnitEditComponent },
  { path: ':id/status', component: UnitStatusComponent }
]

@NgModule({
  imports: [RouterModule.forChild(unitRoutes)],
  exports: [RouterModule]
})
export class UnitRoutingModule { }