import { Component, OnInit, Input } from '@angular/core';
import { StorageService } from '../../_services/storage.service';
import { AuthService } from '../../_services/auth.service';
import { EventBusService } from '../../_shared/event-bus.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @Input() isLoggedIn!: boolean;
  @Input() username!: string;
  @Input() showAdminBoard!: boolean;
  roles: any;
  eventBusSub: any;

  constructor(private storageService: StorageService,
    private authService: AuthService, private eventBusService: EventBusService) { }

    ngOnInit(): void {
      this.isLoggedIn = this.storageService.isLoggedIn();
      if (this.isLoggedIn) {
        const user = this.storageService.getUser();
        this.roles = user.roles;
        this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
        this.username = user.username;
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



