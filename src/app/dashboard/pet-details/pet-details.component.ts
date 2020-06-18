import { Component, OnInit, ViewChild } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { NgSelectModule, NgOption, NgSelectConfig } from '@ng-select/ng-select';
import { ApiCommonService } from 'src/app/services/api-common.service';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { SpinnerService } from 'src/app/services/spinner.service';
import { AlertService } from 'src/app/services/alert.service';
import { Subscription } from 'rxjs';
import { SelectedUserService } from 'src/app/services/selected-user.service';
@Component({
  selector: 'app-pet-details',
  templateUrl: './pet-details.component.html',
  styleUrls: ['./pet-details.component.scss']
})
export class PetDetailsComponent implements OnInit {
  @ViewChild('dt1', { static: false }) dt1: any;
  columns = [
    { field: 'url', header: 'Picture' },
    { field: 'name', header: 'Pet Name' },
    { field: 'age', header: 'Age (In Years)' },
    { field: 'breedName', header: 'Breed' },
    { field: 'gender', header: 'Gender' },
    { field: 'weight', header: 'Weight (In KG)' },
    { field: 'actions', header: 'Action' },
  ];
  selectedUserSubscription: Subscription;
  selectedUserId: any;
  selectedUserName: any;
  vaccines = [];
  allPets = [];
  dates = new Date();
  dialogHeader = '';
  vaccineDetailsForm: FormGroup;
  displayPetDetailsDialog: boolean = false;
  constructor(private config: NgSelectConfig, private apiCommonService: ApiCommonService, private _fb: FormBuilder, private spinnerService: SpinnerService,
    private alertService: AlertService, private selectedUserService: SelectedUserService) {
    this.vaccineDetailsForm = this._fb.group({
      petsId: ["", Validators.required],
      vaccineImmunizationDateVoList: this._fb.array([this.setLines()])
    });
    this.config.appendTo = 'body';
    this.getVaccine();
  }

  setLines() {
    return this._fb.group({
      immunizationDate: ['', Validators.required],
      vaccineDetailsId: [''],
      vaccineId: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.selectedUserSubscription = this.selectedUserService
      .getSelectedUserId()
      .subscribe(selectedUserId => {
        this.selectedUserId = selectedUserId;
      });
    this.vaccineDetailsForm.controls.petsId.setValue(this.selectedUserId);
    this.selectedUserSubscription = this.selectedUserService
      .getSelectedUserName()
      .subscribe(selectedUserName => {
        this.selectedUserName = selectedUserName;
      });
    this.getAllPetsByUser();
  }

  deleteVaccine(index: any) {
    const line = this.vaccineDetailsForm.get('vaccineImmunizationDateVoList') as FormArray;
    line.removeAt(index);
  }
  showDialog() {
    this.displayPetDetailsDialog = true;
    this.dialogHeader = "Update Details";
  }
  hideDialog() {
    this.displayPetDetailsDialog = false;
    this.vaccineDetailsForm.reset();
    const lineItemcontrol = <FormArray>this.vaccineDetailsForm.controls['vaccineImmunizationDateVoList'];
    for (let i = lineItemcontrol.length - 1; i >= 0; i--) {
      lineItemcontrol.removeAt(i);
    }
  }

  addNewVaccine() {
    let control = <FormArray>this.vaccineDetailsForm.controls.vaccineImmunizationDateVoList;
    control.push(this._fb.group({
      immunizationDate: ["", Validators.required],
      vaccineDetailsId: [""],
      vaccineId: ["", Validators.required]
    }));
  }

  getAllPetsByUser() {
    this.allPets = [];
    this.spinnerService.showLoader();
    this.apiCommonService.get("/pet/" + this.selectedUserId).subscribe(res => {
      console.log(res);
      res.forEach(element => {
        this.allPets.push({
          "gender": element.gender,
          "weight": element.weight,
          "petsId": element.petsId,
          "url": element.url,
          "breedName": element.breedName,
          "name": element.name,
          "age": element.age
        });
      });
    }, (err) => {
    }, () => {
      this.spinnerService.hideLoader();
      // this.dt1.reset();
    })
  }

  ngOnDestroy() {
    this.selectedUserSubscription.unsubscribe();
  }

  getVaccine() {
    this.vaccines = [];
    this.spinnerService.showLoader();
    this.apiCommonService.get("/admin/vaccine/").subscribe(res => {
      console.log(res);
      this.vaccines = res;
    }, (err) => {
    }, () => {
      this.spinnerService.hideLoader();
    })
  }

  saveVaccineDetails() {
    console.log(this.vaccineDetailsForm.value);
    if (this.vaccineDetailsForm.valid) {
      this.spinnerService.showLoader();
      this.apiCommonService.post("/admin/vaccine-details/", this.vaccineDetailsForm.value).subscribe(res => {
        console.log(res);
        this.alertService.clearMessage();
        this.alertService.sendMessage(res.message, 'success');
        this.hideDialog();
        this.getAllPetsByUser();
      }, (err) => {
      }, () => {

        this.spinnerService.hideLoader();
      })
    } else {
      Object.keys(this.vaccineDetailsForm.controls).forEach(field => {
        const control = this.vaccineDetailsForm.get(field);
        control.markAsTouched({ onlySelf: true });
      });
    }
  }
}
