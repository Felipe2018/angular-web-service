import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { AppRoutingService } from './app.routes';
import { NgxPaginationModule } from 'ngx-pagination';

import { HeaderNavbarComponent } from './components/common/header-navbar/header-navbar.component';
import { HomeComponent } from './components/home/home.component';

import { ApiService } from './components/common/utilities/_services/api.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderNavbarComponent
  ],
  imports: [
    NgxPaginationModule,
    BrowserModule,
    AppRoutingService,
    HttpModule
  ],
  providers: [
    ApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
