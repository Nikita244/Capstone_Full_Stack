import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor() { }

  IsLoggedIn(){
    const token = sessionStorage.getItem('auth-user')
    if(token != null){
      return true;
    }else{
      return false;
    }
  }
}
