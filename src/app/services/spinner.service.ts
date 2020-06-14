import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
    providedIn: 'root'
})
export class SpinnerService {
    private loaderSource = new BehaviorSubject<boolean>(false);
    showLoader(): void {
        this.loaderSource.next(true);
    }
    hideLoader(): void {
        this.loaderSource.next(false);
    }
    getLoaderValue(): Observable<any> {
        return this.loaderSource.asObservable();
    }
}