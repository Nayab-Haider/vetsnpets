import { Component, OnInit } from '@angular/core';
import { ApiCommonService } from 'src/app/services/api-common.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SpinnerService } from 'src/app/services/spinner.service';
import { AlertService } from 'src/app/services/alert.service';
import { Router } from '@angular/router';
import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  logInCardForm: boolean;
  forgotCardForm: boolean;
  loginForm: FormGroup;
  constructor(private apiCommonService: ApiCommonService, private _fb: FormBuilder, private spinnerService: SpinnerService,
    private alertService: AlertService, private router: Router,
    private $localStorage: LocalStorageService,
    private $sessionStorage: SessionStorageService) {
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
        this.router.navigate(['./dashboard/tabs/add-vaccine']);
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



}
