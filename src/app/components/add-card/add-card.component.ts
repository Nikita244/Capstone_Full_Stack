import { Component, Input } from '@angular/core';
import { EditCardsService } from '../edit-cards.service';

@Component({
  selector: 'app-add-card',
  templateUrl: './add-card.component.html',
  styleUrls: ['./add-card.component.scss']
})
export class AddCardComponent {

  @Input() isLoggedIn!: boolean;

  form: any = {
    immagine:null,
    nome_comune:null,
    nome_scientifico: null,
    habitat: null,
    descrizione: null

  };

  isSuccessful = false;
  isFailed = false;
  errorMessage = '';

  formSubmitted = false;


  constructor(
    private editcardsservice: EditCardsService
  ) {}


  onSubmit(): void {
    const {immagine, nome_comune, nome_scientifico, habitat, descrizione } = this.form;

    this.formSubmitted = true;

    this.editcardsservice.cards(immagine, nome_comune, nome_scientifico, habitat, descrizione).subscribe({
      next: data => {
        console.log(data);
        this.isSuccessful = true;
        this.isFailed = false;
        window.scrollTo(0, 0); // scrolla in cima alla pagina
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isFailed = true;

      }
    });
  }
}
