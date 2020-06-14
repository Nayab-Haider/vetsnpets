import { Component, OnInit } from '@angular/core';
import { ApiCommonService } from 'src/app/services/api-common.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SpinnerService } from 'src/app/services/spinner.service';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  logInCardForm: boolean;
  forgotCardForm: boolean;
  loginForm: FormGroup;
  constructor(private apiCommonService: ApiCommonService, private _fb: FormBuilder, private spinnerService: SpinnerService, private alertService: AlertService) {
    this.logInCardForm = true;
    this.forgotCardForm = false;
    this.loginForm = this._fb.group({
      "password": ['', Validators.required],
      "userName": ['', Validators.required],
    })
  }

  ngOnInit(): void {
  }
  changeFormState(state) {
    if (state == 'logInCardForm') {
      this.logInCardForm = true; this.forgotCardForm = false;
    }
    if (state == 'forgotCardForm') {
      this.forgotCardForm = true; this.logInCardForm = false;
    }
  }

  login() {
    this.spinnerService.showLoader();
    const body = {
      "password": this.loginForm.controls.password.value,
      "userName": this.loginForm.controls.userName.value
    }
    this.apiCommonService.post("/user/authenticate", body).subscribe(res => {
      console.log(res);
      this.alertService.clearMessage();
      this.alertService.sendMessage("Login Successfully", 'success');
    }, (err) => {
      this.spinnerService.hideLoader();
    }, () => {
      this.spinnerService.hideLoader();
    })
  }

}
