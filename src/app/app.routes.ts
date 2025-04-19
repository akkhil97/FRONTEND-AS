import {  Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { LoggedpageComponent } from './loggedpage/loggedpage.component';

export const routes: Routes = [
  { path: '', component: HomeComponent }, // Default route
  { path: 'login', component: LoginComponent }, // Login route
  { path: 'loggedpage', component: LoggedpageComponent }, // Login route
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];

export class AppRoutingModule { }
