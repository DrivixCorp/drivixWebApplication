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
      console.log("111111111111111");
      return null;
      
    }
    else{
      console.log("22222222222");
      var authUser = localStorage.getItem('authUser');
      if(authUser != null){
        console.log(authUser)
        console.log("33333333333");
        this.userData = JSON.parse(authUser);
        return this.userData;
      }
        return this.userData;
      }
  }
}
