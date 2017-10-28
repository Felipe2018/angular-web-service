import { Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
/**
 * Aquí se pueden declarar las rutas por las que se podrá navegar en la aplicación, si necesitas
 * un sistema de login puedes agregarle un Guard.
 * @see [Ruteo y navegación](https://angular.io/guide/router)
 */
const AppRoutesService: Routes = [
  { path: 'home', component: HomeComponent},
  { path: '', component: HomeComponent},
  { path: '**', pathMatch: 'full', redirectTo: 'home' }
];

export const AppRoutingService = RouterModule.forRoot(AppRoutesService, {useHash: true});
