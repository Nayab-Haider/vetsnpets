import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddVaccineComponent } from 'src/app/dashboard/add-vaccine/add-vaccine.component';
import { TabsComponent } from './tabs/tabs.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { PetDetailsComponent } from './pet-details/pet-details.component';


const routes: Routes = [
  {
    path: '', component: TabsComponent,
    children: [
      { path: '', redirectTo: 'add-vaccine', pathMatch: 'full' },
      { path: 'add-vaccine', component: AddVaccineComponent },
      { path: 'user-details', component: UserDetailsComponent },
      { path: 'pet-details', component: PetDetailsComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
