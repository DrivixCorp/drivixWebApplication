import { admin } from './../../OOP/classes/admin';
import { element } from 'protractor';
import { AuthenticationService } from './../Services/authentication.service';
import { JqueryCallingService } from './../Services/jquery-calling.service';
import { userInterface } from './../../OOP/Interfaces/userInterface';
import { user } from 'src/OOP/classes/user';
import { GasStationService } from './../Services/gas-station.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { isArray } from 'util';
import { existsSync } from 'fs';
declare var $:any;
@Component({
  selector: 'app-gas-staion',
  templateUrl: './gas-staion.component.html',
  styleUrls: ['./gas-staion.component.css']
})
export class GasStaionComponent implements OnInit {

  /* err msg */ 
  allAlerts:string[]=[];
  alertErr:string[]=[];
    alertSuc:string[]=[];

  /*to diplay full width map*/
  lat:any;
  long:any;

  userData:user;
  Review:any;
  existReview:boolean;
  /* data of gas station */
  gasStationData:any = null;
  DataInModal:any =null;
  constructor(private gasStationService:GasStationService,
    private jq:JqueryCallingService,public Authentication:AuthenticationService,private router:Router) { }

  ngOnInit() {
    this.jq.essentialCoding();
    this.userData = this.Authentication.checkAuth();
    if(this.userData == null){
      this.router.navigate(['/home']);
    }
    $(document).on("click", ".open-AddBookDialog", function () {
      var myBookId = $(this).data('id');
      $("#GasStationID").val( myBookId );
      // As pointed out in comments, 
      // it is superfluous to have to manually call the modal.
      // $('#addBookDialog').modal('show');
 });
  }
  openModelMaps(lat:any,long:any){
    this.lat = parseFloat(lat);
    this.long = parseFloat(long);
  }

  tofloat(value){
    return parseFloat (value);
  }
  showMsgError(Messsage:any){
    this.alertErr = [];
    this.alertSuc = [];
    for (let index = 0; index < Messsage.length; index++) {
    this.alertErr.push(Messsage[index]);
    }
    this.navigateToTop();
    
}
showsucess(Messsage:any){
  this.alertErr = [];
  this.alertSuc = [];
 
 for (let index = 0; index < Messsage.length; index++) {
 this.alertSuc.push(Messsage[index]);
 }
 this.navigateToTop();
 
}
  passID(data:any){
    this.DataInModal = data;
    this.userMakeReviewOrNot(this.DataInModal.id);
  }
  navigateToTop(){

    $('.formError').show('fast').delay(6000).hide('slow');
  }
  showGasStation(city:any,filter:any){
      if(city != null && filter != null){
      this.gasStationService.showGasStation(city,filter)
      .then(data =>{
          this.allAlerts = [];
          if(data!=null){
          this.allAlerts.push("Sucesssfuly Search");
          this.showsucess(this.allAlerts);
          this.gasStationData = data;
          console.log(this.gasStationData);
          }
          else{
           this.allAlerts.push("No Gas Station Found");
           this.showMsgError(this.allAlerts);
          }
      })
      .catch(err => {
        console.log(err);
        if(err.status == 400){
          this.allAlerts = [];
          this.allAlerts.push("Please Enter Valid City");
          this.showMsgError(this.allAlerts);
        }
      });
    }
  }
  makeGasStationReview(gasId:any,rate:any){
    if(this.userData != null){
      this.gasStationService.getGasStationReview(this.userData.token,gasId,rate)
      .then(secess =>{
        console.log(secess)
      })
      .catch(err =>{
        console.log(err)
      });
    }
    
  }

  userMakeReviewOrNot(gasId:any){
    if(this.userData != null){
      this.gasStationService.userMakeReviewOrNot(this.userData.token,gasId)
      .then(data =>{
       
        this.Review = data;
        console.log(this.Review);
        if(isArray(this.Review)){
          this.existReview = false;
        }
        else this.existReview = true;
      })
      .catch(err =>{
        console.log(err)
      });
    }
    
  }
}
