import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { StorageService } from './components/_services/storage.service';
import { AuthService } from './components/_services/auth.service';
import { EventBusService } from './components/_shared/event-bus.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
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
    private eventBusService: EventBusService
  ) { }

  ngOnInit(): void {

    let consentStatus = localStorage.getItem('cookie-consent');

    if (consentStatus === null) {
      // Se il valore non è stato ancora impostato, salva la scelta dell'utente
      let cc = window as any;
      cc.cookieconsent.initialise({
        "cookie": {
          "domain": "http://localhost:4200"
        },
        "position": "bottom",
        "theme": "classic",
        "palette": {
          "popup": {
            "background": "#00050B",
            "text": "#ffffff",
            "link": "#7b7b7b"
          },
          "button": {
            "background": "#ff4500",
            "text": "#ffffff",
            "border": "transparent"
          }
        },
        "type": "info",
        "content": {
          "message": "Questo sito Web utilizza i cookie per assicurarti la migliore esperienza sul nostro sito Web.",
          "dismiss": "Ho capito",
          "deny": "Refuse cookies",
          "link": "Scopri di più",
          "href": "http://localhost:4200/cookie_policy",
          "policy": "Cookie Policy"
        },
        onStatusChange: function (status: string) {
          localStorage.setItem('cookie-consent', status);
          consentStatus = status;
        }
      });


      let style = document.createElement('style');
      style.innerHTML = '.cc-window .cc-dismiss a { text-decoration: none; }';
      document.head.appendChild(style);
    } else {
      // Se il valore è stato già impostato, non fare nulla
    }

    this.authService.isLoggedIn.subscribe((loggedIn) => {
      this.isLoggedIn = loggedIn;
    });

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
}
