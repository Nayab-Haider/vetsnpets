import { Component, OnInit, ViewChild, ElementRef, OnDestroy, ChangeDetectorRef, AfterViewChecked } from "@angular/core";
import { Subscription } from "rxjs";
import { SpinnerService } from 'src/app/services/spinner.service';
import { AlertService } from 'src/app/services/alert.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy, AfterViewChecked {
  @ViewChild("alert") alert: ElementRef;
  title = 'vets-and-pets';
  public loadingSpinner = false;
  message: any;
  messageSubscription: Subscription;
  spinnerSubscription: Subscription;
  alertSubscription: Subscription;
  alertMsg: any;
  alertType: any;
  setType: string;
  removeAlert = false;

  constructor(private spinnerService: SpinnerService, private alertService: AlertService) {

  }

  ngOnInit() {
    this.spinnerSubscription = this.spinnerService
      .getLoaderValue()
      .subscribe(loader => {
        this.loading(loader);
      });
    this.alertSubscription = this.alertService
      .getAlertType()
      .subscribe(alertType => {
        this.alertType = alertType;
      });
    this.messageSubscription = this.alertService
      .getMessage()
      .subscribe(message => {
        this.message = message;
        this.closeAlert();
      });
  }

  ngOnDestroy() {
    this.messageSubscription.unsubscribe();
    this.spinnerSubscription.unsubscribe();
  }
  ngAfterViewChecked() {

  }

  loading(loader) {
    if (loader) {
      this.loadingSpinner = true;
    } else {
      this.loadingSpinner = false;
    }
  }

  closeAlert() {
    if (this.alertType === "error") {
      this.setType = "alert-danger";
    } else if (this.alertType === "success") {
      this.setType = "alert-success";
    }
    this.removeAlert = false;
    this.alert.nativeElement.classList.add("show");
    setTimeout(() => {
      this.alert.nativeElement.classList.remove("show");
      this.removeAlert = true;
    }, 3000);
  }

  dismissAlert() {
    this.alert.nativeElement.classList.remove("show");
    this.removeAlert = true;
  }
}
