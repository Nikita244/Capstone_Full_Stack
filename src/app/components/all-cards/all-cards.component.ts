import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { PaginationService } from '../_services/pagination.service';

interface Card {
  id: number;
  immagine: string;
  nome_comune: string
  nome_scientifico: string
  habitat: string;
  descrizione: string;
}

@Component({
  selector: 'app-all-cards',
  templateUrl: './all-cards.component.html',
  styleUrls: ['./all-cards.component.scss']
})
export class AllCardsComponent implements OnInit {

  @Input() isLoggedIn!: boolean;

  p: number = 1;

  cards: Card[] = [];

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private pagination: PaginationService
  ) { }

  ngOnInit(): void {
    this.getGardsPage();
  }

  getGardsPage(): void {
    this.pagination.getCardsPaginated().subscribe(cards => {
      this.cards = cards;
    })

  }

  elimina(id: number) {

    const cardToDelete = this.cards.find(card => card.id === id);
    if (!cardToDelete) {
      return;
    }

    const nomeComuneInMaiuscolo = cardToDelete.nome_comune.toUpperCase();

    if (window.confirm(`Hai scelto di eliminare definitivamente la Card "${nomeComuneInMaiuscolo}".\nL'operazione è irreversibile. Sei sicuro di voler procedere?`)) {
      const url = `http://localhost:8080/api/delete_card/${id}`;
      this.http.delete(url).subscribe(
        () => {
          // Rimuovi la carta dall'elenco
          this.cards = this.cards.filter((card) => card.id !== id);
          console.log(`Card con ID ${id} rimossa con successo.`);

          // Mostra un messaggio di conferma
          window.alert(`La Card "${nomeComuneInMaiuscolo}" è stata eliminata con successo.`);
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }

  modifica(id: number): void {
    this.router.navigate(['modify_card/' + id])
  };
}

