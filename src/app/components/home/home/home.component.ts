import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { StorageService } from '../../_services/storage.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  isLoggedIn= false;
  ngOnInit(): void {
    if(this.storage.isLoggedIn()){
      this.isLoggedIn = true;
    }
  }

  constructor(private storage: StorageService){}

  //@Input() isLoggedIn!: boolean;
  eventBusSub?: Subscription;

}
