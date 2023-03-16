import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:8080/app/';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getPublicContent(): Observable<any> {
    return this.http.get(API_URL, { responseType: 'text' });
  }

  getUserBoard(): Observable<any> {
    return this.http.get(API_URL, { responseType: 'text' });
  }

  getModeratorBoard(): Observable<any> {
    return this.http.get(API_URL, { responseType: 'text' });
  }

  getAdminBoard(): Observable<any> {
    return this.http.get(API_URL, { responseType: 'text' });
  }
}
