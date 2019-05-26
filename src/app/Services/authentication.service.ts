import { CredentialService } from './credential.service';
import { Injectable } from '@angular/core';
import { user } from 'src/OOP/classes/user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor() { }

  userData:user=null;

  checkAuth() {
    if(!CredentialService.isAuth){
      return null;
    }
    else{
      var authUser = localStorage.getItem('authUser');
      if(authUser != null){
        return JSON.parse(authUser);
      }
        return this.userData;
      }
  }
}
