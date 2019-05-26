import { Component, OnInit } from '@angular/core';

declare var $:any;
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  
  constructor() { }

  ngOnInit() {
    this.jqueryCalling();
  }

  jqueryCalling(){
    $(function(){
      // class container on the toolbar
      
      if($(window).outerWidth() < 992){
        $('footer section > div').removeClass('container-fluid').addClass('container');
      }
      else{
        $('footer section > div').addClass('container-fluid').removeClass('container');
      }
      $(window).on('resize', function(){
        if($(window).outerWidth() < 992){
          $('footer section > div').removeClass('container-fluid').addClass('container');
        }
        else{
          $('footer section > div').addClass('container-fluid').removeClass('container');
        }
      });

    }); 
  }

}
