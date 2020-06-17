import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiCommonService } from 'src/app/services/api-common.service';
import { FormBuilder } from '@angular/forms';
import { SpinnerService } from 'src/app/services/spinner.service';
import { AlertService } from 'src/app/services/alert.service';
import { SelectedUserService } from 'src/app/services/selected-user.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
  columns = [
    { field: 'username', header: 'User Name' },
    { field: 'emailAddress', header: 'Email' },
    { field: 'contactNumber', header: 'Contact' },
    { field: 'actions', header: 'Action' },
  ];
  users = [];
  constructor(private router: Router, private apiCommonService: ApiCommonService, private _fb: FormBuilder, private spinnerService: SpinnerService,
    private alertService: AlertService, private selectedUserService: SelectedUserService) {
    this.getUsersList();
  }

  getUsersList() {
    this.users = [];
    this.spinnerService.showLoader();
    this.apiCommonService.get("/admin/all-users").subscribe(res => {
      res.forEach(element => {
        this.users.push({
          "userRegistrationId": element.userRegistrationId,
          "username": element.firstName + " " + element.lastName,
          "emailAddress": element.emailAddress,
          "contactNumber": element.contactNumber
        });
      });
    }, (err) => {
    }, () => {
      this.spinnerService.hideLoader();
    })
  }

  ngOnInit(): void {
  }
  viewAllPets(event: any) {
    console.log(event);
    this.selectedUserService.setSelectedUserId(event.userRegistrationId);
    this.selectedUserService.setSelectedUserName(event.username);
    this.router.navigate(['/dashboard/pet-details']);
  }
}
