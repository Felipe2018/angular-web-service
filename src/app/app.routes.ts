import { Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';

const AppRoutesService: Routes = [
  { path: 'home', component: HomeComponent},
  { path: '', component: HomeComponent},
  { path: '**', pathMatch: 'full', redirectTo: 'home' }
]

export const AppRoutingService = RouterModule.forRoot(AppRoutesService, {useHash: true});