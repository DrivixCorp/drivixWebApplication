import { Component, OnInit } from '@angular/core';
declare var $:any;

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {
  
  constructor() { 

  }

  ngOnInit() {
    
  }

  fun(id:any){
    $(document).ready(function(){
      if(id == 'all'){
        $('.Convertible').show(500);
        $('.Coup').show(500);
        $('.Hared').show(500);
        $('.Sedan').show(500);
        $('.Sports').show(500);
        $('.Suv').show(500);
      }
      else if(id == 'Convertible'){
        $('.Convertible').show(500);
        $('.Coup').hide(500);
        $('.Hared').hide(500);
        $('.Sedan').hide(500);
        $('.Sports').hide(500);
        $('.Suv').hide(500);
      }
      else if(id == 'Coup'){
        $('.Convertible').hide(500);
        $('.Coup').show(500);
        $('.Hared').hide(500);
        $('.Sedan').hide(500);
        $('.Sports').hide(500);
        $('.Suv').hide(500);
      }
      else if(id == 'Hared'){
        $('.Convertible').hide(500);
        $('.Coup').hide(500);
        $('.Hared').show(500);
        $('.Sedan').hide(500);
        $('.Sports').hide(500);
        $('.Suv').hide(500);
      }
      else if(id == 'Sedan'){
        $('.Convertible').hide(500);
        $('.Coup').hide(500);
        $('.Hared').hide(500);
        $('.Sedan').show(500);
        $('.Sports').hide(500);
        $('.Suv').hide(500);
      }
      else if(id == 'Sports'){
        $('.Convertible').hide(500);
        $('.Coup').hide(500);
        $('.Hared').hide(500);
        $('.Sedan').hide(500);
        $('.Sports').show(500);
        $('.Suv').hide(500);
      }
      else if(id == 'Suv'){
        $('.Convertible').hide(500);
        $('.Coup').hide(500);
        $('.Hared').hide(500);
        $('.Sedan').hide(500);
        $('.Sports').hide(500);
        $('.Suv').show(500);
      }
    });
  }
  /*zommInOut(id:any){
    $('#'+id).css('z-index','99999');
    $('#'+id).css('position','absolute');
    $('#'+id).css('width','100%');
    $('#'+id).css('height','100%');
  }*/
  

}