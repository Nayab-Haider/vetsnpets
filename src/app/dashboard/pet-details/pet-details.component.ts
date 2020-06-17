import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { NgSelectModule, NgOption, NgSelectConfig } from '@ng-select/ng-select';
@Component({
  selector: 'app-pet-details',
  templateUrl: './pet-details.component.html',
  styleUrls: ['./pet-details.component.scss']
})
export class PetDetailsComponent implements OnInit {
  columns = [
    { field: 'image', header: 'Pet Image' },
    { field: 'petname', header: 'Pet Name' },
    { field: 'age', header: 'Age' },
    { field: 'breed', header: 'Breed' },
    { field: 'dob', header: 'D.O.B' },
    { field: 'gender', header: 'Gender' },
    { field: 'weight', header: 'Weight' },
    { field: 'colour', header: 'Colour' },
    { field: 'actions', header: 'Action' },
  ];
  items = [
    { id: 1, name: 'Vilnius' },
    { id: 2, name: 'Kaunas' },
    { id: 3, name: 'Pavilnys' },
    { id: 4, name: 'Pabradė' },
    { id: 5, name: 'Klaipėda' },
    { id: 1, name: 'Vilnius' },
    { id: 2, name: 'Kaunas' },
    { id: 3, name: 'Pavilnys' },
    { id: 4, name: 'Pabradė' },
    { id: 5, name: 'Klaipėda' },
  ];
  selectedItemIds: string[];
  car: SelectItem[];
  selectedItem: Item[];
  allPets: Pets[];
  dates: Date[];
  value: Date;
  dialogHeader = '';
  displayPetDetailsDialog: boolean = false;
  constructor(private config: NgSelectConfig) {
    this.config.appendTo = 'body';
    this.allPets = [
      { image: '', petname: 'Charlie', age: '08 year', breed: 'Bulldog', colour: 'White', dob: "2020 - 06 - 16", gender: 'MALE', weight: '14kg', actions: "" },
    ];
  }

  ngOnInit(): void {
  }
  showDialog() {
    this.displayPetDetailsDialog = true;
    this.dialogHeader = "Update Details";
  }
  hideDialog() {
    this.displayPetDetailsDialog = false;
  }
}
export interface Pets {
  image;
  petname;
  age;
  colour;
  dob;
  breed;
  gender;
  weight;
  actions;
}
export interface Item {
  name: string,
  code: string
}