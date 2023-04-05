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

  errore = false;

  onSubmit(): void {

    if (!this.immagine || !this.nome_comune || !this.nome_scientifico || !this.habitat || !this.descrizione) {
      this.errore = true;
      setTimeout(() => {
        this.errore = false
      }, 5000);
      return;
    }

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
        this.isSuccessful = true; // imposto la proprietà a true
        //mi riporta alla tabella
        ///this.router.navigate(['/all_cards']);
        window.scrollTo(0, 0); // scrolla in cima alla pagina

      }, (error =>{
        console.log(error);

      }));
    });
  }
}
