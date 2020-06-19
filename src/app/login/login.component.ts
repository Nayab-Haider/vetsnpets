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
  changePasswordCardForm: boolean;
  loginForm: FormGroup;
  fogotPasswordForm: FormGroup;
  forgotForm: FormGroup;
  constructor(private apiCommonService: ApiCommonService, private _fb: FormBuilder, private spinnerService: SpinnerService,
    private alertService: AlertService, private router: Router,
    private $localStorage: LocalStorageService,
    private $sessionStorage: SessionStorageService,
    private loginLogoutService: LoginLogoutService) {
    this.logInCardForm = true;
    this.forgotCardForm = false;
    this.changePasswordCardForm = false;
    this.loginForm = this._fb.group({
      "password": ['', Validators.required],
      "userName": ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.forgotForm = this._fb.group({
      "email": [null, [Validators.required, Validators.email]]
    });
    this.fogotPasswordForm = this._fb.group({
      "oldEmail": [null],
      "otp": [null, [Validators.required]],
      "password": [null, [Validators.required]],
      "confirmPassword": [null, [Validators.required]],
    });
  }
  changeFormState(state) {
    if (state == 'logInCardForm') {
      this.logInCardForm = true; this.forgotCardForm = false; this.changePasswordCardForm = false;
    }
    if (state == 'forgotCardForm') {
      this.forgotCardForm = true; this.logInCardForm = false; this.changePasswordCardForm = false;
      this.forgotForm.reset();
    }
    if (state == 'changePasswordCardForm') {
      this.changePasswordCardForm = true; this.forgotCardForm = false; this.logInCardForm = false;
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
      "emailAddress": this.fogotPasswordForm.controls.oldEmail.value,
      "otp": this.fogotPasswordForm.controls.otp.value,
      "password": this.fogotPasswordForm.controls.password.value
    }
    if (this.fogotPasswordForm.valid) {
      if (this.fogotPasswordForm.controls.password.value === this.fogotPasswordForm.controls.confirmPassword.value) {
        this.spinnerService.showLoader();
        this.apiCommonService.put("/user/reset-password", body).subscribe(res => {
          this.alertService.clearMessage();
          this.alertService.sendMessage("Password Change Successfully", 'success');
          this.$sessionStorage.store('authenticationtoken', res.token);
          this.loginLogoutService.hideLogin();
          this.changePasswordCardForm = false;
          this.logInCardForm = true;
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

  getNewPassword() {
    this.fogotPasswordForm.reset();
    if (this.forgotForm.valid) {
      this.spinnerService.showLoader();
      console.log(this.forgotForm.controls.email.value);
      let emailAddress = this.forgotForm.controls.email.value;
      this.loginLogoutService.forgotPassword(emailAddress).subscribe((res) => {
        this.spinnerService.hideLoader();
        this.alertService.clearMessage();
        if (res.status == 'OK') {
          this.alertService.sendMessage("Send OTP In Your Email", 'success');
          this.fogotPasswordForm.controls.oldEmail.setValue(emailAddress);
          this.changePasswordCardForm = true;
          this.forgotCardForm = false;
          this.logInCardForm = false;
        }
        else {
          this.changePasswordCardForm = false;
        }
      }, err => {
        this.spinnerService.hideLoader();
      }, () => { this.spinnerService.hideLoader(); })
    } else {
      this.forgotForm.controls.email.markAsDirty();
    }
  }
}
