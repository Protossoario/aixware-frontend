// Angular dependencies
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Routes
import { AppRoutingModule } from './app-routing.module';

// Feature modules
import { UnitModule } from './unit/unit.module';
import { UserModule } from './user/user.module';

// Core module
import { CoreModule } from './core/core.module';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    AppRoutingModule,
    BrowserModule,
    CoreModule,
    UnitModule,
    UserModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
