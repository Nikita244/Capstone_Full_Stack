import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

interface Card {
  id: number;
  immagine: string;
  nome_comune:string
  nome_scientifico:string
  habitat: string;
  descrizione: string;
}

@Component({
  selector: 'app-all-cards',
  templateUrl: './all-cards.component.html',
  styleUrls: ['./all-cards.component.scss']
})
export class AllCardsComponent implements OnInit{

  @Input() isLoggedIn!: boolean;

  cards: Card[] = [];

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    const url = `http://localhost:8080/api/cards_page`;
    this.http.get<Card[]>(url).subscribe((response) => {
      this.cards = response;
      console.log(response);
    });
  }

  elimina(id:number){
    console.log(id);
  }

}

