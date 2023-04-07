import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

interface Card {
  id: number;
  immagine: string;
  nome_comune: string
  nome_scientifico: string
  habitat: string;
  descrizione: string;
}

@Component({
  selector: 'app-card-details',
  templateUrl: './card-details.component.html',
  styleUrls: ['./card-details.component.scss']
})

export class CardDetailsComponent implements OnInit {

  immagine = '';
  nome_comune = '';
  nome_scientifico = '';
  habitat = '';
  descrizione = '';

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      const url = `http://localhost:8080/api/card/${id}`;
      this.http.get<Card>(url).subscribe((response) => {
        this.immagine = response.immagine;
        this.nome_comune = response.nome_comune;
        this.nome_scientifico = response.nome_scientifico;
        this.habitat = response.habitat;
        this.descrizione = response.descrizione;
        console.log(response);
      });
    });
  }
}

