import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddVaccineComponent } from 'src/app/dashboard/add-vaccine/add-vaccine.component';


const routes: Routes = [
  {
    path: 'add-vaccine',
    component: AddVaccineComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
