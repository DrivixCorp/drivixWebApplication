import { JqueryCallingService } from './../Services/jquery-calling.service';
import { CarServiceService } from './../Services/car-service.service';
import { AuthenticationService } from './../Services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { user } from 'src/OOP/classes/user';
import { Router } from '@angular/router';
import { MyCar } from 'src/OOP/Interfaces/my-car';
declare var $:any;

@Component({
  selector: 'app-mycars',
  templateUrl: './mycars.component.html',
  styleUrls: ['./mycars.component.css']
})
export class MycarsComponent implements OnInit {
  Brand_car:any;
  Model_car:any;
  Year_car:any;
  Color_car:any;

   /* err msg */
   allAlerts:string[]=[];
   alertErr:string[]=[];
    alertSuc:string[]=[];

   UrlAlert:string;
   userData:user;
   errorCode:number;

   PushedData:MyCar;
   carData:MyCar;

  constructor(private router:Router,public Authentication:AuthenticationService,
    private CarService:CarServiceService,private jq:JqueryCallingService) { }

  ngOnInit() {
    this.jq.essentialCoding();
    this.userData = this.Authentication.checkAuth();
    if(this.userData == null){
      this.router.navigate(['/home']);
    }
    this.loadMultiple();
  }
  loadMultiple(){
    this.CarService.GetAllCarOfUser(this.userData.token)
    .then(data =>{
      this.carData = data;
      console.log(this.carData);
    })
    .catch(err =>{
      console.log(err)
    });
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

  navigateToTop(){
    var toScroll = $('.modal').offset().top;
    $('html, body').animate({
      scrollTop: toScroll
    }, 1000);

    $('.formError').show('fast').delay(3000).hide('slow');

  }
  pushCarData(CarData){
    this.PushedData = CarData;
    console.log(this.PushedData);
  }

  AddCar(){
    this.CarService.addNewCar(this.userData.token,this.Year_car,this.Color_car,this.Model_car,this.Brand_car)
    .then(sucess =>{
     // console.log(sucess)
      this.allAlerts = [];
      this.allAlerts.push("Car Added Secssfully");
      this.showsucess(this.allAlerts);
      this.loadMultiple();
    })
    .catch(err =>{
      console.log(err);
      this.allAlerts = [];
      if(err.error.msg) this.allAlerts.push(err.error.msg);
      if(err.msg) this.allAlerts.push(err.msg);
      this.showMsgError(this.allAlerts);
      if(err.error.model){
        for (let index = 0; index < (err.error.model).length; index++) {
          this.allAlerts.push(err.error.model[index]);
        }
      }
      if(err.error.year){
        for (let index = 0; index < (err.error.year).length; index++) {
          this.allAlerts.push(err.error.year[index]);
        }
      }
      if(err.error.color){
        for (let index = 0; index < (err.error.color).length; index++) {
          this.allAlerts.push(err.error.color[index]);
        }
      }
      if(err.error.brand){
        for (let index = 0; index < (err.error.brand).length; index++) {
          this.allAlerts.push(err.error.brand[index]);
        }
      }
      this.showMsgError(this.allAlerts);
    });
  }
  editCar(carid:any){
    this.CarService.editCar(this.userData.token,this.PushedData.year,this.PushedData.color,this.PushedData.model,this.PushedData.brand,carid)
    .then(sucess =>{
      this.allAlerts = [];
      this.allAlerts.push("Car Edit Secssfully");
      this.showsucess(this.allAlerts);
      this.loadMultiple();
    })
    .catch(err =>{
      console.log(err);
      this.allAlerts = [];
      if(err.error.msg) this.allAlerts.push(err.error.msg);
      if(err.msg) this.allAlerts.push(err.msg);
      this.showMsgError(this.allAlerts);
      if(err.error.model){
        for (let index = 0; index < (err.error.model).length; index++) {
          this.allAlerts.push(err.error.model[index]);
        }
      }
      if(err.error.year){
        for (let index = 0; index < (err.error.year).length; index++) {
          this.allAlerts.push(err.error.year[index]);
        }
      }
      if(err.error.color){
        for (let index = 0; index < (err.error.color).length; index++) {
          this.allAlerts.push(err.error.color[index]);
        }
      }
      if(err.error.brand){
        for (let index = 0; index < (err.error.brand).length; index++) {
          this.allAlerts.push(err.error.brand[index]);
        }
      }
      this.showMsgError(this.allAlerts);
    });
  }

  deleteCar(carid){
    this.CarService.deleteCar(this.userData.token,carid)
    .then(sucess =>{
      this.allAlerts = [];
      this.allAlerts.push("Car Deleted Secssfully");
      this.showsucess(this.allAlerts);
      this.loadMultiple();
    })
    .catch(err =>{
      this.allAlerts = [];
      this.allAlerts.push("Faild To delete Car");
      this.showMsgError(this.allAlerts);
    });
  }




}
