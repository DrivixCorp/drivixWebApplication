import { Injectable } from '@angular/core';

declare var $:any;

@Injectable({
  providedIn: 'root'
})
export class JqueryCallingService {

  constructor() { }

  essentialCoding(){
    $('html, body').animate({
      scrollTop: 0
    }, 1000);
  }
}
