import { Component, OnInit, Input } from '@angular/core';
import { StorageService } from '../../_services/storage.service';
import { AuthService } from '../../_services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @Input() isLoggedIn!: boolean;
  @Input() username!: string;

  constructor(private storageService: StorageService,
    private authService: AuthService) { }

  ngOnInit(): void {
    const user = this.storageService.getUser();
    this.username = user.username;
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
