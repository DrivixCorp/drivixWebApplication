import { AuthenticationService } from './../Services/authentication.service';
import { ManageRolesService } from './../Services/manage-roles.service';
import { JqueryCallingService } from './../Services/jquery-calling.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { user } from 'src/OOP/classes/user';
declare var $:any;
@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.css']
})
export class OffersComponent implements OnInit {
 /*offer*/
 title_offer:any;
 date_offer:any;
 date2_offer:any;
 desc_offer:any;
 editOfferData:any;

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
 imgOffer:any;

 UrlAlert:string;
 userData:user;
 errorCode:number;

 /* images variable Of Product*/
 imagePath2:any;
 imgURL2: any = [];
 message2: string;
 saveImage2:any = [];
 phoneData:any;
 id:any;
 role_id:any;
 AllData:any;
 type:any;
 public constructor(
  private router:Router,private manageRoleService:ManageRolesService,
     private jq:JqueryCallingService,public Authentication:AuthenticationService,
     private route:ActivatedRoute) {
  this.route.queryParams.subscribe(params => {
      this.id = params["Data"];
      this.role_id = params["Data2"];
      this.type = params["Data3"];
  });
 }
 
 ngOnInit() {
 
  this.jq.essentialCoding();
 this.userData = this.Authentication.checkAuth();
 if(this.userData == null){
   this.router.navigate(['/home']);
 }
  this.loadMultiple();
  
 }
 loadMultiple(){
  this.manageRoleService.viewProviderRoleWithDetailes(this.userData.token,this.role_id,this.type)
  .then(data =>{
    this.AllData = data;
    console.log(this.AllData)
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
  this.saveImage = [];
  this.imgURL = [];
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
  console.log("-----");
  this.editOfferData.img = this.imgURL[0];
  console.log();
}
  addOffer(){
    console.log(this.saveImage)
    if(this.saveImage){
     this.manageRoleService.addOffer(this.userData.token,this.date_offer,this.date2_offer,this.desc_offer,this.title_offer,this.role_id,this.saveImage[0])
    .then(sucess =>{
     console.log(sucess)
     this.allAlerts = [];
        if(sucess.msg) this.allAlerts.push(sucess.msg);
        this.showsucess(this.allAlerts);
        this.loadMultiple();
    })
    .catch(err =>{
     this.allAlerts = [];
        if(err.error.msg) this.allAlerts.push(err.error.msg);
        if(err.msg) this.allAlerts.push(err.msg);
        if(err.error.startDate){
            for (let index = 0; index < (err.error.startDate).length; index++) {
              this.allAlerts.push(err.error.startDate[index]);
            }
          }
          if(err.error.endDate){
           for (let index = 0; index < (err.error.endDate).length; index++) {
             this.allAlerts.push(err.error.endDate[index]);
           }
         }
         if(err.error.description){
           for (let index = 0; index < (err.error.description).length; index++) {
             this.allAlerts.push(err.error.description[index]);
           }
         }
         if(err.error.title){
           for (let index = 0; index < (err.error.title).length; index++) {
             this.allAlerts.push(err.error.title[index]);
           }
         }
         if(err.error.img){
           for (let index = 0; index < (err.error.img).length; index++) {
             this.allAlerts.push(err.error.img[index]);
           }
         }
          this.showMsgError(this.allAlerts);
    });
    }
    else{
     console.log("testttttt")
     this.allAlerts = [];
     this.allAlerts.push("Image Reuired");
     this.showMsgError(this.allAlerts);
    }
  }
  passDataOffer(data:any){
   this.editOfferData = data;
 
  }
  editOffer(id:any){
 //   if(this.saveImage[0]) this.editOfferData.img = this.saveImage[0];
   console.log(this.saveImage)
   if(this.saveImage){
    this.manageRoleService.editOffer(this.userData.token,this.editOfferData.startdate,this.editOfferData.enddate,this.editOfferData.describtion,this.editOfferData.title,this.role_id,this.saveImage[0],id)
   .then(sucess =>{
    console.log(sucess)
    this.allAlerts = [];
       if(sucess.msg) this.allAlerts.push(sucess.msg);
       this.showsucess(this.allAlerts);
       this.loadMultiple();
   })
   .catch(err =>{
    this.allAlerts = [];
       if(err.error.msg) this.allAlerts.push(err.error.msg);
       if(err.msg) this.allAlerts.push(err.msg);
       if(err.error.startDate){
           for (let index = 0; index < (err.error.startDate).length; index++) {
             this.allAlerts.push(err.error.startDate[index]);
           }
         }
         if(err.error.endDate){
          for (let index = 0; index < (err.error.endDate).length; index++) {
            this.allAlerts.push(err.error.endDate[index]);
          }
        }
        if(err.error.description){
          for (let index = 0; index < (err.error.description).length; index++) {
            this.allAlerts.push(err.error.description[index]);
          }
        }
        if(err.error.title){
          for (let index = 0; index < (err.error.title).length; index++) {
            this.allAlerts.push(err.error.title[index]);
          }
        }
        if(err.error.img){
          for (let index = 0; index < (err.error.img).length; index++) {
            this.allAlerts.push(err.error.img[index]);
          }
        }
         this.showMsgError(this.allAlerts);
   });
   }
   else{
    this.allAlerts = [];
    this.allAlerts.push("Image Reuired");
    this.showMsgError(this.allAlerts);
   }
 }

 deleteOffer(id:any){
     this.manageRoleService.deleteOffer(this.userData.token,this.role_id,id)
    .then(sucess =>{
     console.log(sucess)
     this.allAlerts = [];
        if(sucess.msg) this.allAlerts.push(sucess.msg);
        this.showsucess(this.allAlerts);
        this.loadMultiple();
    })
    .catch(err =>{
     this.allAlerts = [];
        if(err.error.msg) this.allAlerts.push(err.error.msg);
        if(err.msg) this.allAlerts.push(err.msg);
      
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

}
