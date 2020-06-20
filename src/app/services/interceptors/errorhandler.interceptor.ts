import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpRequest,
  HttpErrorResponse,
  HttpHandler,
  HttpEvent
} from "@angular/common/http";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { Router, NavigationExtras } from "@angular/router";
import { AlertService } from "../alert.service"
import { SpinnerService } from "../spinner.service";
import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';
@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {
  constructor(
    private spinnerService: SpinnerService,
    private router: Router,
    private alertService: AlertService,
    private $localStorage: LocalStorageService,
    private $sessionStorage: SessionStorageService,
  ) { }
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      tap(
        (event: HttpEvent<any>) => { },
        (err: any) => {
          this.spinnerService.hideLoader();
          if (err instanceof HttpErrorResponse) {
            if (err.status === 400) {
              this.alertService.clearMessage();
              this.alertService.sendMessage(err.error.message, "error");
            }
            if (err.status >= 401) {
              let navigationExtras: NavigationExtras = {
                queryParams: {
                  message: JSON.stringify(err.error.message),
                  error: JSON.stringify(err.status)
                }
              };
              this.router.navigate(["error"], navigationExtras);
              window.scroll(0, 0);
              if (err.status === 401) {
                this.logout().subscribe();
              }
            }
            if (err.status === 0) {
              this.logout().subscribe();
              let navigationExtras: NavigationExtras = {
                queryParams: {
                  message: "Server Down Please Try Later",
                  error: 503
                }
              };
              this.router.navigate(["error"], navigationExtras);
            }
          }
        }
      )
    );
  }

  logout(): Observable<any> {
    return new Observable(observer => {
      this.$localStorage.clear('authenticationtoken');
      this.$localStorage.clear('permissions');
      this.$sessionStorage.clear('permissions');
      window.localStorage.clear();
      this.$sessionStorage.clear('authenticationtoken');
      observer.complete();
      this.alertService.clearMessage();
      this.alertService.sendMessage('You have logged out successfully.', 'success');
    });
  }
}
