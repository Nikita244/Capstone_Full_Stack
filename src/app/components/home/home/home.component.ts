import { Component, Input } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  @Input() isLoggedIn!: boolean;
  eventBusSub?: Subscription;

}
