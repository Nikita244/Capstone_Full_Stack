import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Cards } from '../cards';

@Injectable({
  providedIn: 'root'
})
export class PaginationService {

  private baseUrl='http://localhost:8080/api';

  constructor(private http: HttpClient) { }

  getCardsPaginated(): Observable<Cards[]>{
    return this.http.get<any>(`${this.baseUrl}/cards_page`).pipe(map(response =>
      response.content
    ))
  }

}
