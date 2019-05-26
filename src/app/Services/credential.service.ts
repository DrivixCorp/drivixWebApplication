import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { userInterface } from 'src/OOP/Interfaces/userInterface';

@Injectable({
  providedIn: 'root'
})
export class CredentialService {

  constructor(public http: HttpClient) { }

  /* check if person is authorize or not */
  static isAuth = false;
  static userName = null;

  /* the Host */
  private host:string = 'http://www.drivixcorp.com/api/';

  login(email,pass) : Promise<userInterface>{
    var loginAPI = this.host + 'login';
    return new Promise<userInterface>((resolve, reject) => {
      this.http.post<userInterface>(loginAPI, JSON.stringify({}), {
        params: new HttpParams().set('email',email).append('password',pass)
      })
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }


  register(email,pass,name) : Promise<userInterface>{
    var registerAPI = this.host + 'register';
    return new Promise<userInterface>((resolve, reject) => {
      this.http.post<userInterface>(registerAPI, JSON.stringify({}), {
        params: new HttpParams().set('email',email).append('password',pass).append('name',name)
      })
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

}
