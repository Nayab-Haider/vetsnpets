import { Component, OnInit } from '@angular/core';
import { DialogService } from "primeng/dynamicdialog";
@Component({
  selector: 'app-add-vaccine',
  templateUrl: './add-vaccine.component.html',
  styleUrls: ['./add-vaccine.component.scss']
})
export class AddVaccineComponent implements OnInit {
  columns = [
    { field: 'vaccineName', header: 'Vaccine Name' },
    { field: 'recurring', header: 'Recurring' },
    { field: 'actions', header: 'Actions' },
  ];
  users: User[];
  display: boolean = false;
  constructor() { }
  showDialog() {
    this.display = true;
  }
  hideDialog() {
    this.display = false;
  }
  ngOnInit(): void {
    this.users = [
      {
        vaccineName: 'Rabies', recurring: 'No', actions: 'john'
      },
    ];
  }
}

export interface User {
  vaccineName;
  recurring;
  actions;
}
