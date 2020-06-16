import { Component, OnInit } from '@angular/core';
import { DialogService } from "primeng/dynamicdialog";
import { AlertService } from 'src/app/services/alert.service';
import { ApiCommonService } from 'src/app/services/api-common.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SpinnerService } from 'src/app/services/spinner.service';
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
  dialogHeader = "";
  vaccineForm: FormGroup;
  vaccines = [];
  displayVaccineDialog: boolean = false;
  displayDeleteVaccineDialog: boolean = false;
  selectedVaccine: any;
  constructor(private apiCommonService: ApiCommonService, private _fb: FormBuilder, private spinnerService: SpinnerService,
    private alertService: AlertService) {
    this.vaccineForm = this._fb.group({
      "recurring": ['', Validators.required],
      "vaccineId": [''],
      "vaccineName": ['', Validators.required],
    });
    this.getVaccine();
  }
  showDialog() {
    this.displayVaccineDialog = true;
    this.vaccineForm.reset();
    this.dialogHeader = "Add New Vaccine";
  }
  showDeleteDialog() {
    this.displayDeleteVaccineDialog = true;
  }
  hideDeleteDialog() {
    this.displayDeleteVaccineDialog = false;
  }
  hideDialog() {
    this.displayVaccineDialog = false;
  }
  ngOnInit(): void {

  }
  selectedRecurring(event: any) {
    console.log(event);
    this.vaccineForm.controls.recurring.setValue(event);
  }
  addVaccine() {
    const body = {
      "recurring": this.vaccineForm.controls.recurring.value,
      "vaccineId": this.vaccineForm.controls.vaccineId.value,
      "vaccineName": this.vaccineForm.controls.vaccineName.value,
    }
    console.log(this.vaccineForm.value);
    if (this.vaccineForm.valid) {
      this.spinnerService.showLoader();
      this.apiCommonService.post("/vaccine/", body).subscribe(res => {
        console.log(res);
        this.alertService.clearMessage();
        this.alertService.sendMessage(res.message, 'success');
        this.hideDialog();
        this.getVaccine();
      }, (err) => {
      }, () => {

        this.spinnerService.hideLoader();
      })
    } else {
      Object.keys(this.vaccineForm.controls).forEach(field => {
        const control = this.vaccineForm.get(field);
        control.markAsTouched({ onlySelf: true });
      });
    }
  }

  getVaccine() {
    this.vaccines = [];
    this.spinnerService.showLoader();
    this.apiCommonService.get("/vaccine/").subscribe(res => {
      console.log(res);
      this.vaccines = res;
    }, (err) => {
    }, () => {
      this.spinnerService.hideLoader();
    })
  }

  editVaccine(event: any) {
    this.showDialog();
    this.dialogHeader = "Update Vaccine";
    console.log(event);
    this.vaccineForm.patchValue(event);
    this.vaccineForm.controls.recurring.setValue("" + event.recurring);
  }

  updateVaccine() {

    const body = {
      "recurring": this.vaccineForm.controls.recurring.value,
      "vaccineId": this.vaccineForm.controls.vaccineId.value,
      "vaccineName": this.vaccineForm.controls.vaccineName.value,
    }
    console.log(this.vaccineForm.value);
    if (this.vaccineForm.valid) {
      this.spinnerService.showLoader();
      this.apiCommonService.put("/vaccine/" + this.vaccineForm.controls.vaccineId.value, body).subscribe(res => {
        console.log(res);
        this.alertService.clearMessage();
        this.alertService.sendMessage(res.message, 'success');
        this.hideDialog();
        this.getVaccine();
      }, (err) => {
      }, () => {

        this.spinnerService.hideLoader();
      })
    } else {
      Object.keys(this.vaccineForm.controls).forEach(field => {
        const control = this.vaccineForm.get(field);
        control.markAsTouched({ onlySelf: true });
      });
    }
  }

  deleteVaccineDialog(event: any) {
    console.log(event);
    this.selectedVaccine = event.vaccineId;
    this.showDeleteDialog();

  }

  deleteVaccine() {
    this.spinnerService.showLoader();
    this.apiCommonService.delete("/vaccine/" + this.selectedVaccine).subscribe(res => {
      console.log(res);
      this.alertService.clearMessage();
      this.alertService.sendMessage(res['message'], 'success');
      this.hideDeleteDialog();
      this.getVaccine();
    }, (err) => {
    }, () => {

      this.spinnerService.hideLoader();
    })
  }
}

