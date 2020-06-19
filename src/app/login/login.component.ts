import { Component, OnInit } from '@angular/core';
import { ApiCommonService } from 'src/app/services/api-common.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SpinnerService } from 'src/app/services/spinner.service';
import { AlertService } from 'src/app/services/alert.service';
import { Router } from '@angular/router';
import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';
import { LoginLogoutService } from 'src/app/services/login-logout.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  logInCardForm: boolean;
  forgotCardForm: boolean;
  loginForm: FormGroup;
  fogotPasswordForm: FormGroup;
  constructor(private apiCommonService: ApiCommonService, private _fb: FormBuilder, private spinnerService: SpinnerService,
    private alertService: AlertService, private router: Router,
    private $localStorage: LocalStorageService,
    private $sessionStorage: SessionStorageService,
    private loginLogoutService: LoginLogoutService) {
    this.logInCardForm = true;
    this.forgotCardForm = false;
    this.loginForm = this._fb.group({
      "password": ['', Validators.required],
      "userName": ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.fogotPasswordForm = this._fb.group({
      "oldPassword": ['', Validators.required],
      "newPassword": ['', Validators.required],
      "confirmNewPassword": ['', Validators.required],
    });
  }
  changeFormState(state) {
    if (state == 'logInCardForm') {
      this.logInCardForm = true; this.forgotCardForm = false;
    }
    if (state == 'forgotCardForm') {
      this.forgotCardForm = true; this.logInCardForm = false;
      this.fogotPasswordForm.reset();
    }
  }

  login() {
    const body = {
      "password": this.loginForm.controls.password.value,
      "userName": this.loginForm.controls.userName.value
    }
    if (this.loginForm.valid) {
      this.spinnerService.showLoader();
      this.apiCommonService.post("/user/authenticate", body).subscribe(res => {
        console.log(res);
        this.alertService.clearMessage();
        this.alertService.sendMessage("Login Successfully", 'success');
        this.$sessionStorage.store('authenticationtoken', res.token);
        this.loginLogoutService.hideLogin();
        this.router.navigate(['./dashboard/add-vaccine']);
      }, (err) => {
      }, () => {
        this.spinnerService.hideLoader();
      })
    } else {
      Object.keys(this.loginForm.controls).forEach(field => {
        const control = this.loginForm.get(field);
        control.markAsTouched({ onlySelf: true });
      });
    }
  }
  changePassword() {
    const body = {
      "oldPassword": this.fogotPasswordForm.controls.oldPassword.value,
      "newPassword": this.fogotPasswordForm.controls.newPassword.value,
      "confirmNewPassword": this.fogotPasswordForm.controls.confirmNewPassword.value
    }
    if (this.fogotPasswordForm.valid) {
      if (this.fogotPasswordForm.controls.newPassword.value === this.fogotPasswordForm.controls.confirmNewPassword.value) {
        this.spinnerService.showLoader();
        this.apiCommonService.post("/user/change-password", body).subscribe(res => {
          this.alertService.clearMessage();
          this.alertService.sendMessage("Password Change Successfully", 'success');
          this.$sessionStorage.store('authenticationtoken', res.token);
          this.loginLogoutService.hideLogin();
        }, (err) => {
        }, () => {
          this.spinnerService.hideLoader();
        })
      } else {
        this.alertService.sendMessage('Passwords do not match. Please provide the same password in both fields.', 'success');
      }
    } else {
      Object.keys(this.fogotPasswordForm.controls).forEach(field => {
        const control = this.fogotPasswordForm.get(field);
        control.markAsTouched({ onlySelf: true });
      });
    }
  }


}
