import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const CARDS = 'http://localhost:8080/api/cards';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class EditCardsService {
  constructor(private http: HttpClient) { }

  cards(immagine: string, nome_comune: string, nome_scientifico: string, habitat: string, descrizione: string): Observable<any> {
    return this.http.post(
      CARDS,
      {
        immagine,
        nome_comune,
        nome_scientifico,
        habitat,
        descrizione
      },
      httpOptions
    );
  }
}
