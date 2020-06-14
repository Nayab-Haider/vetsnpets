
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
@Injectable({ providedIn: 'root' })
export class ApiCommonService {
    static get: any;
    constructor(private http: HttpClient) {
    }
    url = environment.baseUrl;
    headers = new HttpHeaders({
        'Content-Type': 'application/json'
    });
    get(endpoint: string, params?: any): Observable<any> {
        return this.http.get(this.url + endpoint);
    }
    getLatLong(endpoint: string): Observable<any> {
        return this.http.get(endpoint);
    }
    put(endpoint: string, body: any): Observable<any> {
        return this.http.put(this.url + endpoint, body,
            {
                headers: this.headers,
            });
    }
    post(endpoint: string, body: any): Observable<any> {
        return this.http.post(this.url + endpoint, body,
            {
                headers: this.headers,
            });
    }
    postWithFormData(endpoint: string, body: any): Observable<any> {
        var headers = new HttpHeaders();
        headers.append('Content-Type', 'application/form-data');
        return this.http.post(this.url + endpoint, body,
            {
                headers: headers,
            });
    }
    putWithFormData(endpoint: string, body: any): Observable<any> {
        var headers = new HttpHeaders();
        headers.append('Content-Type', 'application/form-data');
        return this.http.put(this.url + endpoint, body,
            {
                headers: headers,
            });
    }
    delete(endpoint: string) {
        return this.http.delete(this.url + endpoint,
            {
                headers: this.headers,
            });
    }








}