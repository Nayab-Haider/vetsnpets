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

@NgModule({
  declarations: [DashboardComponent, AddVaccineComponent, TabsComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    TooltipModule,
    TableModule,
    DialogModule,
    FormsModule,
    ReactiveFormsModule
  ],
  entryComponents: []
})
export class DashboardModule { }
