import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
@Injectable({
    providedIn: 'root'
})
export class AlertService {
    private subject = new Subject<any>();
    private alertType = new Subject<any>();
    sendMessage(message: string, type: string) {
        this.subject.next(message);
        this.alertType.next(type);
    }
    clearMessage() {
        this.subject.next();
        this.alertType.next();
    }
    getMessage(): Observable<any> {
        return this.subject.asObservable();
    }
    getAlertType(): Observable<any> {
        return this.alertType.asObservable();
    }
}