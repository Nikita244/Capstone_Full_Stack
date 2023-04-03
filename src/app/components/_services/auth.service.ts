import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

const AUTH_API_LOG = 'http://localhost:8080/auth/login';
const AUTH_API_REG = 'http://localhost:8080/auth/register';
const AUTH_API_OUT = 'http://localhost:8080/auth/logout';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  private loggedIn = new BehaviorSubject<boolean>(false);

  get isLoggedIn() {
    return this.loggedIn;
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post(
      AUTH_API_LOG ,
      {
        username,
        password,
      },
      httpOptions
    );
  }

  register(nome:string, cognome:string, username: string, email: string, password: string): Observable<any> {
    return this.http.post(
      AUTH_API_REG ,
      {
        nome,
        cognome,
        username,
        email,
        password,
      },
      httpOptions
    );
  }

  logout(): Observable<any> {
    return this.http.post(AUTH_API_OUT, { }, httpOptions);
  }
}
