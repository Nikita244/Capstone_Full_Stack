import { Injectable, Input } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { StorageService } from '../components/_services/storage.service';
import { EventBusService } from '../components/_shared/event-bus.service';
import { AuthService } from '../components/_services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  @Input() isLoggedIn!: boolean;
  @Input() username!: string;
  @Input() showAdminBoard!: boolean;
  roles: any;
  eventBusSub: any;

  constructor(private storageService: StorageService,
    private authService: AuthService, private eventBusService: EventBusService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const isLoggedIn = this.storageService.isLoggedIn();
    if (isLoggedIn) {
      const user = this.storageService.getUser();
      const roles = user.roles;
      const showAdminBoard = roles.includes('ROLE_ADMIN');
      if (showAdminBoard) {
        this.username = user.username;
        return true; // l'utente è autenticato e autorizzato come amministratore
      }
    }
    return this.router.createUrlTree(['/']);
  }
}
