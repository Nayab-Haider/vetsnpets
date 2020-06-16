import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, Route } from '@angular/router';
import { Observable } from 'rxjs';
import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';

@Injectable()
export class OAuthComponentGuard implements CanActivate {


  constructor(private _router: Router, private localStorage: LocalStorageService, private sessionStorage: SessionStorageService) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    let token = this.localStorage.retrieve('authenticationToken') || this.sessionStorage.retrieve('authenticationToken');
    if (token != null) {
      return true;
    }
    this._router.navigate(['/login']);
    return false;
  }

}