import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { SessionStorageService, LocalStorageService } from 'ngx-webstorage';
import { ApiCommonService } from './api-common.service';
@Injectable({
    providedIn: 'root'
})
export class LoginLogoutService {
    private loginLogout = new BehaviorSubject<boolean>(true);
    forgotPassword(email: any): Observable<any> {
        return this.apiCommonService.get("/user/forgot-password/" + email)
    }
    constructor(private apiCommonService: ApiCommonService, private sessionStorage: SessionStorageService, private localStorage: LocalStorageService) {
        let token = this.localStorage.retrieve('authenticationToken') || this.sessionStorage.retrieve('authenticationToken');
        if (token != null) {
            this.loginLogout.next(false);
        } else {
            this.loginLogout.next(true);
        }
    }
    showLogin(): void {
        this.loginLogout.next(true);
    }
    hideLogin(): void {
        this.loginLogout.next(false);
    }
    getLogin(): Observable<any> {
        return this.loginLogout.asObservable();
    }
}