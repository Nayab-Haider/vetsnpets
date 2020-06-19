import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddVaccineComponent } from './add-vaccine/add-vaccine.component';
import { TabsComponent } from './tabs/tabs.component';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { DialogModule } from 'primeng/dialog';
import { UserDetailsComponent } from './user-details/user-details.component';
import { PetDetailsComponent } from './pet-details/pet-details.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { MatMenuModule } from '@angular/material/menu';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatNativeDateModule } from '@angular/material/core';
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
    MatMenuModule,
    MatDatepickerModule,
    MatIconModule,
    MatNativeDateModule
  ],
  entryComponents: []
})
export class DashboardModule { }
