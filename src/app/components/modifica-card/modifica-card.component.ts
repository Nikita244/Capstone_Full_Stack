import { Component, Input, OnInit } from '@angular/core';
import { EditCardsService } from '../edit-cards.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Cards } from '../cards';


@Component({
  selector: 'app-modifica-card',
  templateUrl: './modifica-card.component.html',
  styleUrls: ['./modifica-card.component.scss']
})
export class ModificaCardComponent implements OnInit, Cards{

  @Input() isLoggedIn!: boolean;

  form: any = {
    immagine: null,
    nome_comune: null,
    nome_scientifico: null,
    habitat: null,
    descrizione: null

  };

  isSuccessful = false;
  isFailed = false;
  errorMessage = '';

  formSubmitted = false;

  id = 0;
  immagine = '';
  nome_comune = '';
  nome_scientifico = '';
  habitat = '';
  descrizione = '';

  constructor(
    private editcardsservice: EditCardsService, private route: ActivatedRoute, private http: HttpClient, private router: Router) { }




  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      const url = `http://localhost:8080/api/card/${id}`;
      this.http.get<Cards>(url).subscribe((response) => {
        this.immagine = response.immagine;
        this.nome_comune = response.nome_comune;
        this.nome_scientifico = response.nome_scientifico;
        this.habitat = response.habitat;
        this.descrizione = response.descrizione;
        console.log(response);
      });
    });
  }


  onSubmit(): void {
    const modifica = {
      "immagine":  this.immagine,
      "nome_comune":  this.nome_comune,
      "nome_scientifico":  this.nome_scientifico,
      "habitat":  this.habitat,
      "descrizione":  this.descrizione
    }
    this.route.params.subscribe(params => {
      const id = params['id'];
      const url = `http://localhost:8080/api/modify_card/${id}`;
      this.http.post(url, modifica, { responseType: 'json' }).subscribe(response=>{
        console.log("avvenuto con successo");
        //mi riporta alla tabella
        this.router.navigate(['/all_cards']);

      }, (error =>{
        console.log(error);

      }));
    });
  }
}

