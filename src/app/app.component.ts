import { Component, OnInit, ViewChild, ElementRef, OnDestroy, ChangeDetectorRef, AfterViewChecked } from "@angular/core";
import { Subscription } from "rxjs";
import { SpinnerService } from 'src/app/services/spinner.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy, AfterViewChecked {
  title = 'vets-and-pets';
  public loadingSpinner = false;
  spinnerSubscription: Subscription;

  constructor(private spinnerService: SpinnerService) {

  }

  ngOnInit() {
    this.spinnerSubscription = this.spinnerService
      .getLoaderValue()
      .subscribe(loader => {
        this.loading(loader);
      });
  }

  ngOnDestroy() {

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
}
