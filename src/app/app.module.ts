// Angular dependencies
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

// Guards
import { AuthGuard } from './auth.guard';

// Services
import { AuthService } from './auth.service';
import { UserService } from './user.service';
import { UnitService } from './unit.service';
import { UnitStatusService } from './unit-status.service';

// Routes
import { routing } from './app.routing';

// Components
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { UnitStatusComponent } from './unit-status/unit-status.component';
import { UnitListComponent } from './unit-list/unit-list.component';
import { UnitAddComponent } from './unit-add/unit-add.component';
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    UnitStatusComponent,
    UnitListComponent,
    UnitAddComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  providers: [
    AuthGuard,
    AuthService,
    UserService,
    UnitService,
    UnitStatusService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
