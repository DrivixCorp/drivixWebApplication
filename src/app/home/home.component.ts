import { AuthenticationService } from './../Services/authentication.service';
import { JqueryCallingService } from './../Services/jquery-calling.service';
import { CredentialService } from './../Services/credential.service';
import { Component, OnInit } from '@angular/core';
import { google } from '@agm/core/services/google-maps-types';
import { user } from 'src/OOP/classes/user';

declare var $:any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: 
  [
    './style/animate.component.min.css',
    './home.component.css'
  ]
})
export class HomeComponent implements OnInit {

  static isAuth:boolean=false;
  static userName:string;
  userData:user;
  constructor(private jq:JqueryCallingService,public Authentication:AuthenticationService) {
   
  }

  ngOnInit() {
    this.jq.essentialCoding();
    this.userData = this.Authentication.checkAuth();
  }



}
