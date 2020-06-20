import { Component, OnInit, ViewChild } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { NgSelectModule, NgOption, NgSelectConfig } from '@ng-select/ng-select';
import { ApiCommonService } from 'src/app/services/api-common.service';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { SpinnerService } from 'src/app/services/spinner.service';
import { AlertService } from 'src/app/services/alert.service';
import { Subscription } from 'rxjs';
import { SelectedUserService } from 'src/app/services/selected-user.service';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-pet-details',
  templateUrl: './pet-details.component.html',
  styleUrls: ['./pet-details.component.scss']
})
export class PetDetailsComponent implements OnInit {
  @ViewChild('dt', { static: false }) dt: any;
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
  daysSelected: any[] = [];
  constructor(private config: NgSelectConfig, private apiCommonService: ApiCommonService, private _fb: FormBuilder, private spinnerService: SpinnerService,
    private alertService: AlertService, private selectedUserService: SelectedUserService, private datePipe: DatePipe) {
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
      vaccineDetailsId: [null],
      vaccineId: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.selectedUserSubscription = this.selectedUserService
      .getSelectedUserId()
      .subscribe(selectedUserId => {
        this.selectedUserId = selectedUserId;
      });
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
  showDialog(event: any) {
    this.vaccineDetailsForm.reset();
    const lineItemcontrol = <FormArray>this.vaccineDetailsForm.controls['vaccineImmunizationDateVoList'];
    for (let i = lineItemcontrol.length - 1; i >= 0; i--) {
      lineItemcontrol.removeAt(i);
    }
    console.log(event);
    this.vaccineDetailsForm.controls.petsId.setValue(event.petsId);
    this.displayPetDetailsDialog = true;
    this.dialogHeader = "Update Details";
    this.getvaccineDetailsByPetId();
  }
  hideDialog() {
    this.displayPetDetailsDialog = false;
  }

  addNewVaccine() {
    let control = <FormArray>this.vaccineDetailsForm.controls.vaccineImmunizationDateVoList;
    control.push(this._fb.group({
      immunizationDate: ["", Validators.required],
      vaccineDetailsId: [null],
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
      this.dt.reset();
    })
  }

  ngOnDestroy() {
    this.selectedUserSubscription.unsubscribe();
  }

  getvaccineDetailsByPetId() {
    this.spinnerService.showLoader();
    this.apiCommonService.get("/vaccine-details/" + this.vaccineDetailsForm.controls.petsId.value).subscribe(res => {
      console.log(res);
      let control = <FormArray>this.vaccineDetailsForm.controls.vaccineImmunizationDateVoList;
      res.forEach(element => {
        var dateArr = [];
        element.immunizationDate.forEach(date => {
          dateArr.push(new Date(date));
        })
        console.log(dateArr);
        control.push(this._fb.group({
          immunizationDate: [dateArr, Validators.required],
          vaccineDetailsId: [element.vaccineDetailsId],
          vaccineId: [element.vaccineId, Validators.required]
        }));
      });
    }, (err) => {
    }, () => {
      this.spinnerService.hideLoader();
    })
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
    console.log(this.daysSelected);
    const lineItemcontrol = <FormArray>this.vaccineDetailsForm.controls['vaccineImmunizationDateVoList'];

    for (let i = 0; i <= lineItemcontrol.length - 1; i++) {
      console.log(lineItemcontrol.controls[i]['controls'].immunizationDate.value);
      lineItemcontrol.controls[i]['controls'].immunizationDate.value.forEach((element, index) => {
        lineItemcontrol.controls[i]['controls'].immunizationDate.value[index] = this.datePipe.transform(element, 'yyyy-MM-dd');
      });
    }

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
