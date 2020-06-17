import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
  columns = [
    { field: 'username', header: 'Name' },
    { field: 'email', header: 'Email' },
    { field: 'contact', header: 'Contact' },
    { field: 'actions', header: 'Action' },
  ];
  users: User[];
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.users = [
      { username: 'Nayab Haider', email: 'nayab@gmail.com', contact: +919814762347, actions: "" },
    ];
  }
  viewAllPets() {
    this.router.navigate(['/dashboard/pet-details']);
  }
}
export interface User {
  username;
  contact;
  email;
  actions;
}