import { Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';

const AppRoutesService: Routes = [
  { path: '', component: HomeComponent},
  { path: '**', pathMatch: 'full', redirectTo: '' }
]

export const AppRoutingService = RouterModule.forRoot(AppRoutesService, {useHash: true});