import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  logInCardForm: boolean;
  forgotCardForm: boolean;
  constructor() {
    this.logInCardForm = true;
    this.forgotCardForm = false;
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

}
