import { AuthenticationService } from './../Services/authentication.service';
import { JqueryCallingService } from './../Services/jquery-calling.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { ManageRolesService } from '../Services/manage-roles.service';
import { user } from 'src/OOP/classes/user';
declare var $:any;

@Component({
  selector: 'app-winch-view',
  templateUrl: './winch-view.component.html',
  styleUrls: ['./winch-view.component.css']
})
export class WinchViewComponent implements OnInit {
  formPhone:string;
  /* err msg */ 
  allAlerts:string[]=[];
  alertErr:string[]=[];
    alertSuc:string[]=[];

  /* images variable*/
  imagePath:any;
  imgURL: any = [];
  message: string;
  saveImage:any = [];

  UrlAlert:string;
  userData:user;
  errorCode:number;
  workingDays_winchDriver:any ="";

  splitted_workingDay:any;
  arr_WorkingDay:any = [];
  
  roleID:any;
  type:any;
  AllData:any;
  phoneData:any;
   constructor(private router:Router,private manageRoleService:ManageRolesService,
       private jq:JqueryCallingService,public Authentication:AuthenticationService,
       private route:ActivatedRoute) { }

 ngOnInit() {
   console.log(this.router.url);
   this.jq.essentialCoding();
   this.userData = this.Authentication.checkAuth();
   if(this.userData == null){
     this.router.navigate(['/home']);
   }

   this.route.params.subscribe( params =>
        this.roleID = params['id'] 
   )
   this.route.params.subscribe( params =>
       this.type = params['type'] 
   )
  
   
   this.loadMultiple();
   
}
GoToViewOrder(id:any){
    
  var navigationExtras: NavigationExtras = {
    queryParams: {
      'Data':id
    }
    //skipLocationChange: true
};

this.router.navigate(["order"], navigationExtras);
}
loadMultiple(){
  this.manageRoleService.viewProviderRoleWithDetailes(this.userData.token,this.roleID,this.type)
  .then(data =>{
      console.log(data);
      this.AllData = data;
      this.splitted_workingDay = this.AllData.workingdays.split(","); 
      this.arr_WorkingDay[0] = this.splitted_workingDay.includes('friday');
      this.arr_WorkingDay[1] = this.splitted_workingDay.includes('saturday');
      this.arr_WorkingDay[2] = this.splitted_workingDay.includes('sunday');
      this.arr_WorkingDay[3] = this.splitted_workingDay.includes('monday');
      this.arr_WorkingDay[4] = this.splitted_workingDay.includes('tuesday');
      this.arr_WorkingDay[5] = this.splitted_workingDay.includes('wensday');
      this.arr_WorkingDay[6] = this.splitted_workingDay.includes('thursday');  
      $(document).ready(function() {
   $('.slider_one_big_picture').EasySlides({
       'autoplay': true,
       'stepbystep': false,
       'show': 5,
       'loop': false
   })
   $('.slider_one_big_2').EasySlides({
       'autoplay': false,
       'stepbystep': true,
       'show': 5,
       'loop': false
   })
   $('.slider_circle_10').EasySlides({
       'autoplay': true,
       'show': 13
   })
   $('.slider_four_in_line').EasySlides({
       'autoplay': true,
       'show': 9
   })
   $('.slider_clock').EasySlides({
       'autoplay': true,
       'stepbystep': false,
       'show': 15
   })
});
  })
  .catch(err =>{
      console.log(err);
  });
}
testObject(){
  if(this.AllData) return true;
  else return false;
}
preview(files :any) {
  this.imgURL = [];
  console.log(files)
  this.message= null;
  
  if (files.length === 0)
    return;

  var mimeType :any = [] ;
  for (let i = 0; i < files.length; i++) {
   mimeType [i] = files[i].type;
   if (mimeType[i].match(/image\/*/) == null) {
    this.message = "Only images are supported.";
    return;
  }
  }
  

  var reader:any = [];
  this.imagePath = files;
  for (let i = 0; i < files.length; i++) {
     reader[i] = new FileReader();
    reader[i].readAsDataURL(files[i]);        
  } 
 // console.log(reader);
  for (let i = 0; i < reader.length; i++) {
    reader[i].onload = (_event:any) => { 
      this.imgURL[i] = reader[i].result; 
      var str = this.imgURL[i];
      str = str.substring(str.indexOf(",") + 1);
      this.saveImage.push(str);
    }
  }
}

 addImages(roleID:any){
  console.log(this.saveImage);
  this.manageRoleService.addImages(this.userData.token,roleID,1,this.saveImage)
   .then(data =>{
     console.log(data);
     this.loadMultiple();
   })
   .catch(err =>{
     this.saveImage = [];
     this.allAlerts = [];
     this.allAlerts.push("Faild To Add Image");
     this.showMsgError(this.allAlerts);
   });
 }
 deleteImages(roleID:any,roleIDImg:any){
  //   console.log(this.saveImage);
      this.manageRoleService.deleteImages(this.userData.token,roleID,roleIDImg)
      .then(data =>{
        console.log(data);
        this.loadMultiple();
      })
      .catch(err =>{
        this.saveImage = [];
        this.allAlerts = [];
        this.allAlerts.push("Faild Delete");
        this.showMsgError(this.allAlerts);
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
   passData(dataPhone:any){
       this.phoneData = dataPhone;
   }

   addPhone(){
       this.manageRoleService.addNewPhone(this.userData.token,this.roleID,this.formPhone,"")
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
           if(err.error.phone){
               for (let index = 0; index < (err.error.phone).length; index++) {
                 this.allAlerts.push(err.error.phone[index]);
               }
             }
             this.showMsgError(this.allAlerts);
       });
   }
   editPhone(){
       this.manageRoleService.editPhone(this.userData.token,this.roleID,this.phoneData.phone,this.phoneData.id)
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
           if(err.error.phone){
               for (let index = 0; index < (err.error.phone).length; index++) {
                 this.allAlerts.push(err.error.phone[index]);
               }
             }
             this.showMsgError(this.allAlerts);
       });
   }
   deletePhone(){
       this.manageRoleService.deletePhone(this.userData.token,this.roleID,this.phoneData.id)
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
           if(err.msg) this.allAlerts.push(err.msg);
           if(err.error.phone){
               for (let index = 0; index < (err.error.phone).length; index++) {
                 this.allAlerts.push(err.error.phone[index]);
               }
             }
             this.showMsgError(this.allAlerts);
       });
   }

   saveOrUpdateWinchDriver(type:any,roleID:any){
    this.workingDays_winchDriver="";
    
    if(this.arr_WorkingDay[1]) this.workingDays_winchDriver= this.workingDays_winchDriver  + "saturday,";
    if(this.arr_WorkingDay[2]) this.workingDays_winchDriver= this.workingDays_winchDriver    + "sunday,";
    if(this.arr_WorkingDay[3]) this.workingDays_winchDriver= this.workingDays_winchDriver    + "monday,";
    if(this.arr_WorkingDay[4]) this.workingDays_winchDriver= this.workingDays_winchDriver   + "tuesday,";
    if(this.arr_WorkingDay[5]) this.workingDays_winchDriver= this.workingDays_winchDriver   + "wensday,";
    if(this.arr_WorkingDay[6]) this.workingDays_winchDriver= this.workingDays_winchDriver  + "thursday,";
    if(this.arr_WorkingDay[0]) this.workingDays_winchDriver= this.workingDays_winchDriver    + "friday,";
    if(this.workingDays_winchDriver) this.workingDays_winchDriver = this.workingDays_winchDriver.slice(0,-1);
    
    this.manageRoleService.AddWinchDriver(this.userData.token,type,this.workingDays_winchDriver,this.AllData.name,
      this.AllData.description,this.AllData.work_to,this.AllData.work_from,roleID,this.AllData.winchdriver.price_per_km,"")
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

}
