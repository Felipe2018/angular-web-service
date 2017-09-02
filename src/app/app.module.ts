import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { AppRoutingService } from './app.routes';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MdToolbarModule, MdTableModule, MdTabsModule, 
  MdCardModule, MdPaginatorModule } from '@angular/material';
import { HeaderNavbarComponent } from './components/common/header-navbar/header-navbar.component';
import { HomeComponent } from './components/home/home.component';

import { PhpConnectionService } from './components/common/utilities/_services/php-connection.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderNavbarComponent
  ],
  imports: [
    MdToolbarModule,
    MdTableModule,
    MdTabsModule,
    MdCardModule,
    MdPaginatorModule,
    BrowserModule,
    AppRoutingService,
    BrowserAnimationsModule,
    HttpModule
  ],
  providers: [
    
    PhpConnectionService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
