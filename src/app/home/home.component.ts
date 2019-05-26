import { JqueryCallingService } from './../Services/jquery-calling.service';
import { CredentialService } from './../Services/credential.service';
import { Component, OnInit } from '@angular/core';
import { google } from '@agm/core/services/google-maps-types';

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

  constructor(private jq:JqueryCallingService) {
   
  }

  ngOnInit() {
    this.jq.essentialCoding();
  }



}
