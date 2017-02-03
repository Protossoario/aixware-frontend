import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './auth.guard';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { UnitAddComponent } from './unit-add/unit-add.component';
import { UnitStatusComponent } from './unit-status/unit-status.component';

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'unidad', component: UnitAddComponent, canActivate: [AuthGuard] },
  { path: 'unidad/:id', component: UnitStatusComponent, canActivate: [AuthGuard] },
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);
