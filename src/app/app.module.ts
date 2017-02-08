// Angular dependencies
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';

// Chart.js module for Angular2
import { ChartsModule } from 'ng2-charts';

// Google Maps for Angular2
import { AgmCoreModule } from 'angular2-google-maps/core';

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
import { UnitFilterPipe } from './unit-filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    UnitStatusComponent,
    UnitListComponent,
    UnitAddComponent,
    NavbarComponent,
    UnitFilterPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule.forRoot(),
    ChartsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCEc9SudbT0HNHF1oHsIcsubDo0jbvwgLs'
    }),
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
