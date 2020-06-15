import { Component, OnInit, OnDestroy, AfterViewChecked } from '@angular/core';
import { LoginLogoutService } from 'src/app/services/login-logout.service';
import { Subscription } from 'rxjs';
import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  loginLogoutButtonSubscription: Subscription;
  showHideLoginButton: boolean;
  constructor(private loginLogoutService: LoginLogoutService, private $localStorage: LocalStorageService,
    private $sessionStorage: SessionStorageService,
    private alertService: AlertService) {
    this.showHideLoginButton = true;
  }

  ngOnInit(): void {
    this.loginLogoutButtonSubscription = this.loginLogoutService
      .getLogin()
      .subscribe(message => {
        this.showHideLoginButton = message;
      });
  }

  ngOnDestroy() {
    this.loginLogoutButtonSubscription.unsubscribe();
  }

  signOut() {
    this.$sessionStorage.clear('authenticationtoken');
    window.localStorage.clear();
    this.alertService.clearMessage();
    this.alertService.sendMessage('You have logged out successfully.', 'success');
    this.loginLogoutService.showLogin();
  }

}
