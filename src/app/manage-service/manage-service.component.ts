import { winchCompany } from './../../OOP/classes/winchCompany';
import { winchDriver } from './../../OOP/classes/winchDriver';
import { AuthenticationService } from './../Services/authentication.service';
import { JqueryCallingService } from './../Services/jquery-calling.service';
import { ManageRolesService } from './../Services/manage-roles.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { user } from 'src/OOP/classes/user';
import { NgForm } from '@angular/forms';
declare var $:any;

@Component({
  selector: 'app-manage-service',
  templateUrl: './manage-service.component.html',
  styleUrls: ['./manage-service.component.css']
})
export class ManageServiceComponent implements OnInit {
  workshopExist:boolean = false;
  sparepartExist:boolean =false;
  winchDriverExist:boolean =false;
  winchCompanyExist:boolean =false;

  /*Data Of WinchDriver*/
  
  
  FullName_winchDriver:any;
  timestart_winchDriver:any;
  timeend_winchDriver:any;
  desc_winchDriver:any;
  workingDays_winchDriver:any="";
  Price_winchDriver:any;
  Saturday_winchDriver:any="";
  Sunday_winchDriver:any="";
  Monday_winchDriver:any="";
  Teusday_winchDriver:any="";
  Wensday_winchDriver:any="";
  Thursday_winchDriver:any="";
  Friday_winchDriver:any="";

  /*Data Of WinchCompany*/
  FullName_winchCompany:any;
  timestart_winchCompany:any;
  timeend_winchCompany:any;
  desc_winchCompany:any;
  workingDays_winchCompany:any="";
  Saturday_winchCompany:any="";
  Sunday_winchCompany:any="";
  Monday_winchCompany:any="";
  Teusday_winchCompany:any="";
  Wensday_winchCompany:any="";
  Thursday_winchCompany:any="";
  Friday_winchCompany:any="";
  companyType_winchCompany:any;

  /*data of workshop*/
  FullName_workshop:any;
  timestart_workshop:any;
  timeend_workshop:any;
  desc_workshop:any;
  workingDays_workshop:any="";
  Saturday_workshop:any="";
  Sunday_workshop:any="";
  Monday_workshop:any="";
  Teusday_workshop:any="";
  Wensday_workshop:any="";
  Thursday_workshop:any="";
  Friday_workshop:any="";
  URL_workshop:any ="";
  workshopType_workshop:any = [];

  types_workShop:any = [];

  /*data of spareParts*/
  FullName_spareparts:any;
  timestart_spareparts:any;
  timeend_spareparts:any;
  desc_spareparts:any;
  workingDays_spareparts:any="";
  Saturday_spareparts:any="";
  Sunday_spareparts:any="";
  Monday_spareparts:any="";
  Teusday_spareparts:any="";
  Wensday_spareparts:any="";
  Thursday_spareparts:any="";
  Friday_spareparts:any="";
  URL_spareparts:any="";
  sparePartsType_spareparts:any;

  /* err msg */ 
  allAlerts:string[]=[];
  alertErr:string[]=[];
    alertSuc:string[]=[];

  UrlAlert:string;
  userData:user;
  errorCode:number;
  
  DataOfAll:any;
  DataOfAll_0_winchDriver:any = [];
  DataOfAll_1_winchCompany:any =[];
  DataOfAll_2_workShop:any = [];
  DataOfAll_3_spareParts:any = [];

  constructor(private router:Router,private manageRoleService:ManageRolesService,
    private jq:JqueryCallingService,public Authentication:AuthenticationService) { }

  ngOnInit() {
    
    //console.log(this.router.url);
    this.jq.essentialCoding();
    this.userData = this.Authentication.checkAuth();
    if(this.userData == null){
      this.router.navigate(['/home']);
    }
    this.loadMultiple();
    
  }
  loadMultiple(){
    this.DataOfAll_2_workShop = [];
    // Material Select Initialization
    this.manageRoleService.viewProviderRole(this.userData.token)
    .then(data =>{
      
      //console.log(data);
      this.DataOfAll= data;
     // console.log(this.DataOfAll);
      for (let i = 0; i < this.DataOfAll.length; i++) {
        if(this.DataOfAll[i].type == 0){
          this.DataOfAll_0_winchDriver.push(this.DataOfAll[i]);
          this.winchDriverExist =true;
        }
        if(this.DataOfAll[i].type == 1){
          this.DataOfAll_1_winchCompany.push(this.DataOfAll[i]);
          this.winchCompanyExist = true;
        }
        if(this.DataOfAll[i].type == 2){
          this.DataOfAll_2_workShop.push(this.DataOfAll[i]);
          this.workshopExist = true;
        }
        if(this.DataOfAll[i].type == 3){
          this.DataOfAll_3_spareParts.push(this.DataOfAll[i]);
          this.sparepartExist =true;
        }
      }
      console.log("-*-*-*-*-*-*-*-*-*-*-*");
      console.log(this.DataOfAll_1_winchCompany);
    })
    .catch(err =>{
      console.log(err);
    });
    this.manageRoleService.CheckHasWinchDriver(this.userData.token)
    .then(sucess =>{
     // console.log(sucess);
    })
    .catch(err =>{
     console.log(err);
    });
    


    this.manageRoleService.viewWorkShopTypes(this.userData.token)
    .then(success =>{
      this.types_workShop = success;
      //console.log(this.types_workShop);
    })
    .catch(err =>{
      console.log(err);
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

    $('.formError').show('fast').delay(6000).hide('slow');
    
  }
  pushTypeOfWorkShop(item:any){
    this.workshopType_workshop.push(item);
  }
  activateOrDisabled(roleID:any){
    this.manageRoleService.changeLock(this.userData.token,roleID)
    .then(success =>{
      console.log(success);
      this.allAlerts = [];
        this.allAlerts.push(success.msg);
        this.showsucess(this.allAlerts);
        this.loadMultiple();
    })
    .catch(err =>{
      console.log(err);
      this.allAlerts = [];
      if(err.error.msg) this.allAlerts.push(err.error.msg);
      if(err.msg) this.allAlerts.push(err.msg);
      this.showMsgError(this.allAlerts);
    });
  }

  saveOrUpdateWinchDriver(type:any,roleID:any){
    this.workingDays_winchDriver="";
    
    if(this.Saturday_winchDriver) this.workingDays_winchDriver= this.workingDays_winchDriver  + "saturday,";
    if(this.Sunday_winchDriver) this.workingDays_winchDriver= this.workingDays_winchDriver    + "sunday,";
    if(this.Monday_winchDriver) this.workingDays_winchDriver= this.workingDays_winchDriver    + "monday,";
    if(this.Teusday_winchDriver) this.workingDays_winchDriver= this.workingDays_winchDriver   + "teusday,";
    if(this.Wensday_winchDriver) this.workingDays_winchDriver= this.workingDays_winchDriver   + "wensday,";
    if(this.Thursday_winchDriver) this.workingDays_winchDriver= this.workingDays_winchDriver  + "thursday,";
    if(this.Friday_winchDriver) this.workingDays_winchDriver= this.workingDays_winchDriver    + "friday,";
    if(this.workingDays_winchDriver) this.workingDays_winchDriver = this.workingDays_winchDriver.slice(0,-1);
    
    this.manageRoleService.AddWinchDriver(this.userData.token,type,this.workingDays_winchDriver,this.FullName_winchDriver,
      this.desc_winchDriver,this.timeend_winchDriver,this.timestart_winchDriver,roleID,this.Price_winchDriver,"")
      .then(success =>{
        //console.log(success);
        this.allAlerts = [];
          this.allAlerts.push(success.msg);
          this.showsucess(this.allAlerts);
          this.loadMultiple();
      })
      .catch(err =>{
        console.log(err);
        this.allAlerts = [];
        if(err.error.msg) this.allAlerts.push(err.error.msg);
        if(err.error.description){
          for (let index = 0; index < (err.error.description).length; index++) {
            this.allAlerts.push(err.error.description[index]);
          }
        }
        if(err.error.name){
          for (let index = 0; index < (err.error.name).length; index++) {
            this.allAlerts.push(err.error.name[index]);
          }
        }
        if(err.error.name){
          for (let index = 0; index < (err.error.name).length; index++) {
            this.allAlerts.push(err.error.name[index]);
          }
        }
        if(err.error.type){
          for (let index = 0; index < (err.error.type).length; index++) {
            this.allAlerts.push(err.error.type[index]);
          }
        }
        if(err.error.work_from){
          for (let index = 0; index < (err.error.work_from).length; index++) {
            this.allAlerts.push(err.error.work_from[index]);
          }
        }
        if(err.error.work_to){
          for (let index = 0; index < (err.error.work_to).length; index++) {
            this.allAlerts.push(err.error.work_to[index]);
          }
        }
        if(err.error.workingdays){
          for (let index = 0; index < (err.error.workingdays).length; index++) {
            this.allAlerts.push(err.error.workingdays[index]);
          }
        }
        if(err.error.price_per_km){
          for (let index = 0; index < (err.error.price_per_km).length; index++) {
            this.allAlerts.push(err.error.price_per_km[index]);
          }
        }
        
        this.showMsgError(this.allAlerts);
      });
    
  }

  saveOrUpdateWinchCompany(type:any,roleID:any){
    this.workingDays_winchCompany="";
    
    if(this.Saturday_winchCompany) this.workingDays_winchCompany= this.workingDays_winchCompany  + "saturday,";
    if(this.Sunday_winchCompany) this.workingDays_winchCompany= this.workingDays_winchCompany    + "sunday,";
    if(this.Monday_winchCompany) this.workingDays_winchCompany= this.workingDays_winchCompany    + "monday,";
    if(this.Teusday_winchCompany) this.workingDays_winchCompany= this.workingDays_winchCompany   + "teusday,";
    if(this.Wensday_winchCompany) this.workingDays_winchCompany= this.workingDays_winchCompany   + "wensday,";
    if(this.Thursday_winchCompany) this.workingDays_winchCompany= this.workingDays_winchCompany  + "thursday,";
    if(this.Friday_winchCompany) this.workingDays_winchCompany= this.workingDays_winchCompany    + "friday,";
    if(this.workingDays_winchCompany) this.workingDays_winchCompany = this.workingDays_winchCompany.slice(0,-1);
    this.manageRoleService.AddWinchCompany(this.userData.token,type,this.workingDays_winchCompany,this.FullName_winchCompany,
      this.desc_winchCompany,this.timeend_winchCompany,this.timestart_winchCompany,roleID,this.companyType_winchCompany)
      .then(success =>{
        //console.log(success);
        this.allAlerts = [];
          this.allAlerts.push(success.msg);
          this.showsucess(this.allAlerts);
          this.loadMultiple();
      })
      .catch(err =>{
        console.log(err);
        this.allAlerts = [];
        if(err.error.msg) this.allAlerts.push(err.error.msg);
        if(err.error.description){
          for (let index = 0; index < (err.error.description).length; index++) {
            this.allAlerts.push(err.error.description[index]);
          }
        }
        
        if(err.error.name){
          for (let index = 0; index < (err.error.name).length; index++) {
            this.allAlerts.push(err.error.name[index]);
          }
        }
        if(err.error.type){
          for (let index = 0; index < (err.error.type).length; index++) {
            this.allAlerts.push(err.error.type[index]);
          }
        }
        if(err.error.work_from){
          for (let index = 0; index < (err.error.work_from).length; index++) {
            this.allAlerts.push(err.error.work_from[index]);
          }
        }
        if(err.error.work_to){
          for (let index = 0; index < (err.error.work_to).length; index++) {
            this.allAlerts.push(err.error.work_to[index]);
          }
        }
        if(err.error.workingdays){
          for (let index = 0; index < (err.error.workingdays).length; index++) {
            this.allAlerts.push(err.error.workingdays[index]);
          }
        }
        if(err.error.companyType){
          for (let index = 0; index < (err.error.companyType).length; index++) {
            this.allAlerts.push(err.error.companyType[index]);
          }
        }
        this.showMsgError(this.allAlerts);
      });
    
  }

  saveOrUpdateWorkshop(type:any,roleID:any){
        var i = 0;
    var Types_workShop:any = [];
    $(".workshoptypes:checked").each(function() {
      
      Types_workShop.push($(this).val());
      i++;
    });
    console.log(Types_workShop);
    alert("wait")
    
    this.workingDays_workshop="";

    if(this.Saturday_workshop) this.workingDays_workshop= this.workingDays_workshop  + "saturday,";
    if(this.Sunday_workshop) this.workingDays_workshop= this.workingDays_workshop    + "sunday,";
    if(this.Monday_workshop) this.workingDays_workshop= this.workingDays_workshop    + "monday,";
    if(this.Teusday_workshop) this.workingDays_workshop= this.workingDays_workshop   + "teusday,";
    if(this.Wensday_workshop) this.workingDays_workshop= this.workingDays_workshop   + "wensday,";
    if(this.Thursday_workshop) this.workingDays_workshop= this.workingDays_workshop  + "thursday,";
    if(this.Friday_workshop) this.workingDays_workshop= this.workingDays_workshop    + "friday,";
    if(this.workingDays_workshop) this.workingDays_workshop = this.workingDays_workshop.slice(0,-1);
    this.manageRoleService.AddWorkShop(this.userData.token,type,this.workingDays_workshop,this.FullName_workshop,
      this.desc_workshop,this.timeend_workshop,this.timestart_workshop,roleID,this.URL_workshop,Types_workShop)
      .then(success =>{
        //console.log(success);
        this.allAlerts = [];
          this.allAlerts.push(success.msg);
          this.showsucess(this.allAlerts);
          Types_workShop =[];
          this.loadMultiple();
      })
      .catch(err =>{
       // console.log(Types_workShop);
        Types_workShop =[];
        console.log(err);
        this.allAlerts = [];
        if(err.error.msg) this.allAlerts.push(err.error.msg);
        if(err.error.description){
          for (let index = 0; index < (err.error.description).length; index++) {
            this.allAlerts.push(err.error.description[index]);
          }
        }
        
        if(err.error.name){
          for (let index = 0; index < (err.error.name).length; index++) {
            this.allAlerts.push(err.error.name[index]);
          }
        }
        if(err.error.type){
          for (let index = 0; index < (err.error.type).length; index++) {
            this.allAlerts.push(err.error.type[index]);
          }
        }
        if(err.error.work_from){
          for (let index = 0; index < (err.error.work_from).length; index++) {
            this.allAlerts.push(err.error.work_from[index]);
          }
        }
        if(err.error.work_to){
          for (let index = 0; index < (err.error.work_to).length; index++) {
            this.allAlerts.push(err.error.work_to[index]);
          }
        }
        if(err.error.workingdays){
          for (let index = 0; index < (err.error.workingdays).length; index++) {
            this.allAlerts.push(err.error.workingdays[index]);
          }
        }
        if(err.error.URL){
          for (let index = 0; index < (err.error.URL).length; index++) {
            this.allAlerts.push(err.error.URL[index]);
          }
        }
        
        if(err.error.workshoptype){
          for (let index = 0; index < (err.error.workshoptype).length; index++) {
            this.allAlerts.push(err.error.workshoptype[index]);
          }
        }
        this.showMsgError(this.allAlerts);
      });
    
  }

  saveOrUpdateSpareParts(type:any,roleID:any){
    this.workingDays_spareparts="";    
    if(this.Saturday_spareparts) this.workingDays_spareparts= this.workingDays_spareparts  + "saturday,";
    if(this.Sunday_spareparts) this.workingDays_spareparts= this.workingDays_spareparts   + "sunday,";
    if(this.Monday_spareparts) this.workingDays_spareparts= this.workingDays_spareparts    + "monday,";
    if(this.Teusday_spareparts) this.workingDays_spareparts= this.workingDays_spareparts + "teusday,";
    if(this.Wensday_spareparts) this.workingDays_spareparts= this.workingDays_spareparts  + "wensday,";
    if(this.Thursday_spareparts) this.workingDays_spareparts= this.workingDays_spareparts  + "thursday,";
    if(this.Friday_spareparts) this.workingDays_spareparts= this.workingDays_spareparts   + "friday,";
    if(this.workingDays_spareparts) this.workingDays_spareparts = this.workingDays_spareparts.slice(0,-1);
    this.manageRoleService.AddSpareParts(this.userData.token,type,this.workingDays_spareparts,this.FullName_spareparts,
      this.desc_spareparts,this.timeend_spareparts,this.timestart_spareparts,roleID,this.URL_spareparts,this.sparePartsType_spareparts)
      .then(success =>{
        //console.log(success);
        this.allAlerts = [];
          this.allAlerts.push(success.msg);
          this.showsucess(this.allAlerts);
          this.loadMultiple();
      })
      .catch(err =>{
        console.log(err);
        this.allAlerts = [];
        if(err.error.msg) this.allAlerts.push(err.error.msg);
        if(err.error.description){
          for (let index = 0; index < (err.error.description).length; index++) {
            this.allAlerts.push(err.error.description[index]);
          }
        }
        
        if(err.error.name){
          for (let index = 0; index < (err.error.name).length; index++) {
            this.allAlerts.push(err.error.name[index]);
          }
        }
        if(err.error.type){
          for (let index = 0; index < (err.error.type).length; index++) {
            this.allAlerts.push(err.error.type[index]);
          }
        }
        if(err.error.work_from){
          for (let index = 0; index < (err.error.work_from).length; index++) {
            this.allAlerts.push(err.error.work_from[index]);
          }
        }
        if(err.error.work_to){
          for (let index = 0; index < (err.error.work_to).length; index++) {
            this.allAlerts.push(err.error.work_to[index]);
          }
        }
        if(err.error.workingdays){
          for (let index = 0; index < (err.error.workingdays).length; index++) {
            this.allAlerts.push(err.error.workingdays[index]);
          }
        }
        if(err.error.URL){
          for (let index = 0; index < (err.error.URL).length; index++) {
            this.allAlerts.push(err.error.URL[index]);
          }
        }
        if(err.error.spareshoptype){
          for (let index = 0; index < (err.error.spareshoptype).length; index++) {
            this.allAlerts.push(err.error.spareshoptype[index]);
          }
        }
        
        
        this.showMsgError(this.allAlerts);
      });
    
  }
}
