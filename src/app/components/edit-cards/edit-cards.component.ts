import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../_services/auth.service';
import { StorageService } from '../_services/storage.service';
import { EventBusService } from '../_shared/event-bus.service';
import { EditCardsService } from '../edit-cards.service';

@Component({
  selector: 'app-edit-cards',
  templateUrl: './edit-cards.component.html',
  styleUrls: ['./edit-cards.component.scss']
})
export class EditCardsComponent {
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

  private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username?: string;

  eventBusSub?: Subscription;
  title: any;

  constructor(
    private storageService: StorageService,
    private authService: AuthService,
    private eventBusService: EventBusService,
    private editcardsservice: EditCardsService
  ) {}

  ngOnInit(): void {


    this.isLoggedIn = this.storageService.isLoggedIn();

    if (this.isLoggedIn) {
      const user = this.storageService.getUser();
      this.roles = user.roles;

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');

      this.username = user.username

    }

    this.eventBusSub = this.eventBusService.on('logout', () => {
      this.logout();
    });
  }

  logout(): void {
    this.authService.logout().subscribe({
      next: res => {
        console.log(res);
        this.storageService.clean();

        window.location.reload();
      },
      error: err => {
        console.log(err);
      }
    });
  }

  onSubmit(): void {
    const {immagine, nome_comune, nome_scientifico, habitat, descrizione } = this.form;

    this.formSubmitted = true;

    this.editcardsservice.cards(immagine, nome_comune, nome_scientifico, habitat, descrizione).subscribe({
      next: data => {
        console.log(data);
        this.isSuccessful = true;
        this.isFailed = false;
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isFailed = true;

      }
    });
  }
}
