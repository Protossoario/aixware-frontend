import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './core/auth.guard';
import { HomeComponent } from './core/home/home.component';
import { LoginComponent } from './core/login/login.component';

export const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'unidades', loadChildren: 'app/unit/unit.module#UnitModule', canActivate: [AuthGuard] },
  { path: 'usuarios', loadChildren: 'app/user/user.module#UserModule', canActivate: [AuthGuard] },
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }