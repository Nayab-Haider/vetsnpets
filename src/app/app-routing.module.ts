import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { OAuthComponentGuard } from 'src/app/services/oauth.component.guard';


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    canActivate: [OAuthComponentGuard],
    path: 'dashboard',
    loadChildren: 'src/app/dashboard/dashboard.module#DashboardModule',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
