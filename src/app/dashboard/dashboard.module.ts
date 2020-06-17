import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddVaccineComponent } from './add-vaccine/add-vaccine.component';
import { TabsComponent } from './tabs/tabs.component';
import { TableModule } from "primeng/table";
import { TooltipModule } from 'primeng/tooltip';
import { DialogModule } from 'primeng/dialog';
import { UserDetailsComponent } from './user-details/user-details.component';
import { PetDetailsComponent } from './pet-details/pet-details.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { CalendarModule } from 'primeng/calendar';
@NgModule({
  declarations: [DashboardComponent, AddVaccineComponent, TabsComponent, UserDetailsComponent, PetDetailsComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    TooltipModule,
    TableModule,
    DialogModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    CalendarModule
  ],
  entryComponents: []
})
export class DashboardModule { }
