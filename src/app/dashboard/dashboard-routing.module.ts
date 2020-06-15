import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddVaccineComponent } from 'src/app/dashboard/add-vaccine/add-vaccine.component';
import { TabsComponent } from './tabs/tabs.component';


const routes: Routes = [
  {
    path: '', component: TabsComponent,
    children: [
      { path: '', redirectTo: 'add-vaccine', pathMatch: 'full' },
      { path: 'add-vaccine', component: AddVaccineComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
