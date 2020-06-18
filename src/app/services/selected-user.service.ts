import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { SessionStorageService, LocalStorageService } from 'ngx-webstorage';
@Injectable({
    providedIn: 'root'
})
export class SelectedUserService {
    private selectedUserId = new BehaviorSubject<String>("");
    private selectedUserName = new BehaviorSubject<String>("");
    constructor() {

    }
    setSelectedUserId(userId: String): void {
        this.selectedUserId.next(userId);
    }
    clearSelectedUserId(): void {
        this.selectedUserId.next("");
    }
    getSelectedUserId(): Observable<any> {
        return this.selectedUserId.asObservable();
    }
    

    setSelectedUserName(userName: String): void {
        this.selectedUserName.next(userName);
    }
    clearSelectedUserName(): void {
        this.selectedUserName.next("");
    }
    getSelectedUserName(): Observable<any> {
        return this.selectedUserName.asObservable();
    }
}