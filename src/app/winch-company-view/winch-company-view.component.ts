import { AuthenticationService } from './../Services/authentication.service';
import { JqueryCallingService } from './../Services/jquery-calling.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { ManageRolesService } from '../Services/manage-roles.service';
import { user } from 'src/OOP/classes/user';
import {ViewChild, ElementRef, NgZone } from '@angular/core';
import { MapsAPILoader, MouseEvent } from '@agm/core';
declare var $:any;

@Component({
  selector: 'app-winch-company-view',
  templateUrl: './winch-company-view.component.html',
  styleUrls: ['./winch-company-view.component.css']
})
export class WinchCompanyViewComponent implements OnInit {
  /*branches*/
  formPhone:string;
  formPhone2:string;
  desOfBranches:string;
  editDataBranch:any;
  /* err msg */ 
  allAlerts:string[]=[];
  alertErr:string[]=[];
    alertSuc:string[]=[];

  /* images variable*/
  imagePath:any;
  imgURL: any = [];
  message: string;
  saveImage:any = [];

  manageData:any;

  UrlAlert:string;
  userData:user;
  errorCode:number;
  workingDays_winchCompany:any="";

  splitted_workingDay:any;
  arr_WorkingDay:any = [];
  
  roleID:any;
  type:any;
  AllData:any;
  phoneData:any;


  /*Data Of WinchDriver*/
  
  
  FullName_winchDriver:any;
  Email_winchDriver:any;
  Pass_winchDriver:any;
  Pass2_winchDriver:any;
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

  DataOfFreeWinchDriver:any;
  dataOfOneWinchDriver:any;

   //location
   title: string = 'AGM project';
   latitude: number;
   editLocation:any;
   longitude: number;
   zoom: number;
   address: string;
   private geoCoder:any;
   colorLike:any;
   @ViewChild('search')
   public searchElementRef: ElementRef;
   // end location

   constructor(private router:Router,private manageRoleService:ManageRolesService,
       private jq:JqueryCallingService,public Authentication:AuthenticationService,
       private route:ActivatedRoute, private mapsAPILoader: MapsAPILoader,
       private ngZone: NgZone) { }

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
    this.manageRoleService.getFreeWinchDrivert(this.userData.token , this.AllData.id)
        .then(sucess =>{
          this.DataOfFreeWinchDriver = sucess;
          console.log(this.DataOfFreeWinchDriver)
        })
        .catch(err =>{
          console.log(err)
        });
   })
   .catch(err =>{
       console.log(err);
   });

    // statt location
    this.mapsAPILoader.load().then(() => {
      this.setCurrentLocation();
      this.geoCoder = new google.maps.Geocoder;
 
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ["address"]
      });
     
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();
          console.log("place")
          console.log(place.geometry)
          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
 
          //set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = 12;
        });
      });
    });
    //end location
}
// Get Current Location Coordinates
private setCurrentLocation() {
  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition((position) => {
      this.latitude = position.coords.latitude;
      this.longitude = position.coords.longitude;
      this.zoom = 8;
      this.getAddress(this.latitude, this.longitude);
    });
  }
}


markerDragEnd($event: MouseEvent) {
  console.log($event);
  this.latitude = $event.coords.lat;
  this.longitude = $event.coords.lng;
  this.getAddress(this.latitude, this.longitude);
}
markerDragEnd2(lat:number,long:number) {
  this.latitude = lat;
  this.longitude = long;
  this.getAddress(this.latitude, this.longitude);
}

getAddress(latitude, longitude) {
  this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
    if (status === 'OK') {
      if (results[0]) {
        this.zoom = 12;
        this.address = results[0].formatted_address;
      } else {
        window.alert('No results found');
      }
    } else {
      window.alert('Geocoder failed due to: ' + status);
    }

  });
}
passDataOfWinchDriver(data){
  this.dataOfOneWinchDriver = data;
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

   saveOrUpdateWinchCompany(type:any,roleID:any){
    this.workingDays_winchCompany="";
    
    if(this.arr_WorkingDay[1]) this.workingDays_winchCompany= this.workingDays_winchCompany  + "saturday,";
    if(this.arr_WorkingDay[2]) this.workingDays_winchCompany= this.workingDays_winchCompany    + "sunday,";
    if(this.arr_WorkingDay[3]) this.workingDays_winchCompany= this.workingDays_winchCompany    + "monday,";
    if(this.arr_WorkingDay[4]) this.workingDays_winchCompany= this.workingDays_winchCompany   + "tuesday,";
    if(this.arr_WorkingDay[5]) this.workingDays_winchCompany= this.workingDays_winchCompany   + "wensday,";
    if(this.arr_WorkingDay[6]) this.workingDays_winchCompany= this.workingDays_winchCompany  + "thursday,";
    if(this.arr_WorkingDay[0]) this.workingDays_winchCompany= this.workingDays_winchCompany    + "friday,";
    if(this.workingDays_winchCompany) this.workingDays_winchCompany = this.workingDays_winchCompany.slice(0,-1);
    this.manageRoleService.AddWinchCompany(this.userData.token,type,this.workingDays_winchCompany,this.AllData.name,
      this.AllData.description,this.AllData.work_to,this.AllData.work_from,roleID,"0")
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

  saveWinchDriver(){
    console.log(this.Pass_winchDriver+" -- " + this.Pass2_winchDriver)
   if(this.Pass_winchDriver == this.Pass2_winchDriver){
    this.workingDays_winchDriver="";
    
    if(this.Saturday_winchDriver) this.workingDays_winchDriver= this.workingDays_winchDriver  + "saturday,";
    if(this.Sunday_winchDriver) this.workingDays_winchDriver= this.workingDays_winchDriver    + "sunday,";
    if(this.Monday_winchDriver) this.workingDays_winchDriver= this.workingDays_winchDriver    + "monday,";
    if(this.Teusday_winchDriver) this.workingDays_winchDriver= this.workingDays_winchDriver   + "teusday,";
    if(this.Wensday_winchDriver) this.workingDays_winchDriver= this.workingDays_winchDriver   + "wensday,";
    if(this.Thursday_winchDriver) this.workingDays_winchDriver= this.workingDays_winchDriver  + "thursday,";
    if(this.Friday_winchDriver) this.workingDays_winchDriver= this.workingDays_winchDriver    + "friday,";
    if(this.workingDays_winchDriver) this.workingDays_winchDriver = this.workingDays_winchDriver.slice(0,-1);

    this.manageRoleService.AddWinchDriverForSpecificCompany(this.userData.token,this.AllData.id,this.Email_winchDriver,this.Pass_winchDriver,this.Price_winchDriver
      ,this.workingDays_winchDriver,this.FullName_winchDriver,this.desc_winchDriver,this.timeend_winchDriver,this.timestart_winchDriver)
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
        if(err.error.password){
          for (let index = 0; index < (err.error.password).length; index++) {
            this.allAlerts.push(err.error.password[index]);
          }
        }
       
        if(err.error.work_from){
          for (let index = 0; index < (err.error.work_from).length; index++) {
            this.allAlerts.push(err.error.work_from[index]);
          }
        }
        if(err.error.email){
          for (let index = 0; index < (err.error.email).length; index++) {
            this.allAlerts.push(err.error.email[index]);
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
  else{
    this.allAlerts = [];
    this.allAlerts.push("Confirm Password Is Not Correct");
    this.showMsgError(this.allAlerts);
  }
   }
   pushWinchData(data:any){
    this.manageData = data;
   }
   editWinchDriver(){
     if(this.manageData.availability) this.manageData.availability = 1; 
     else this.manageData.availability = 0; 
    this.manageRoleService.EditWinchDriverForSpecificCompany(this.userData.token,this.AllData.id,this.manageData.id,this.manageData.price_per_km,this.manageData.availability)
      .then(success =>{
        //console.log(success);
        this.allAlerts = [];
          this.allAlerts.push("Sucssfull");
          this.showsucess(this.allAlerts);
          this.loadMultiple();
      })
      .catch(err =>{
        console.log(err);
        this.allAlerts = [];
        if(err.error.msg) this.allAlerts.push(err.error.msg);
        if(err.error.price_per_km){
          for (let index = 0; index < (err.error.price_per_km).length; index++) {
            this.allAlerts.push(err.error.price_per_km[index]);
          }
        }
        if(err.error.availability){
          for (let index = 0; index < (err.error.availability).length; index++) {
            this.allAlerts.push(err.error.availability[index]);
          }
        }
        
        
        this.showMsgError(this.allAlerts);
      });
    
  }
  assignToWinchCompany(WinchDriver_id:any){
    this.manageRoleService.assignWinchDrivert(this.userData.token, this.AllData.id ,WinchDriver_id)
    .then(sucss =>{
      this.allAlerts = [];
      this.allAlerts.push("Sucssfull Assign");
      this.showsucess(this.allAlerts);
      this.loadMultiple();
    })
    .catch(err =>{
      this.allAlerts = [];
      this.allAlerts.push("Failed Operation");
      this.showMsgError(this.allAlerts);
    });
  }
  cancelAssign(WinchDriver_id:any){
    this.manageRoleService.cancelassignWinchDrivert(this.userData.token, this.AllData.id ,WinchDriver_id)
    .then(sucss =>{
      this.allAlerts = [];
      this.allAlerts.push("Sucssfull Deleted");
      this.showsucess(this.allAlerts);
      this.loadMultiple();
    })
    .catch(err =>{
      this.allAlerts = [];
      this.allAlerts.push("Failed Operation");
      this.showMsgError(this.allAlerts);
    });
  }
  addBranch(W_id:any){
    console.log(this.formPhone2 +' -- '+ this.desOfBranches +' -- '+ W_id)
    this.manageRoleService.addBrach(this.userData.token,this.AllData.id,this.formPhone2,this.desOfBranches,W_id,"")
    .then(sucess =>{
      console.log(sucess);
      this.allAlerts = [];
      this.allAlerts.push("Branch Add Sucessfull");
      this.showsucess(this.allAlerts);
      this.loadMultiple();
    })
    .catch(err =>{
      console.log(err);
      this.allAlerts = [];
      this.allAlerts.push("Failed");
      this.showMsgError(this.allAlerts);
    });
  }
  editBranch(W_id:any,branch_id:any){
    console.log(this.formPhone2 +' -- '+ this.desOfBranches +' -- '+ W_id)
    this.manageRoleService.addBrach(this.userData.token,this.AllData.id,this.editDataBranch.phone,this.editDataBranch.address,W_id,branch_id)
    .then(sucess =>{
      console.log(sucess);
      this.allAlerts = [];
      this.allAlerts.push("Branch Efit Sucessfull");
      this.showsucess(this.allAlerts);
      this.loadMultiple();
    })
    .catch(err =>{
      console.log(err);
      this.allAlerts = [];
      this.allAlerts.push("Failed");
      this.showMsgError(this.allAlerts);
    });
  }
  deleteBranch(W_id:any,branch_id:any){
    this.manageRoleService.deleteBrach(this.userData.token,this.AllData.id,W_id,branch_id)
    .then(sucess =>{
      console.log(sucess);
      this.allAlerts = [];
      this.allAlerts.push("Branch Delete Sucessfull");
      this.showsucess(this.allAlerts);
      this.loadMultiple();
    })
    .catch(err =>{
      console.log(err);
      this.allAlerts = [];
      this.allAlerts.push("Failed Deleted");
      this.showMsgError(this.allAlerts);
    });
  }
  passDataBranch(data:any){
    this.editDataBranch = data;
  }

  passDataLocation(data:any){
    this.editLocation = data;
    this.markerDragEnd2(parseFloat(this.editLocation.lat),parseFloat(this.editLocation.long));
  }
  addLocation(id:any){
    this.manageRoleService.addLocation(this.userData.token,id,this.address,this.latitude,this.longitude,"")
    .then(sucess =>{
      this.allAlerts = [];
      this.allAlerts.push("Location Add Sucessfull");
      this.showsucess(this.allAlerts);
      this.loadMultiple();
    })
    .catch(err =>{
      this.allAlerts = [];
      this.allAlerts.push("Faild To ADD Location");
      this.showMsgError(this.allAlerts);
      console.log(err);
    });
  }
  editLocatio(id:any){
    this.manageRoleService.editLocatio(this.userData.token,id,this.address,this.latitude,this.longitude,this.editLocation.id)
    .then(sucess =>{
      this.allAlerts = [];
      this.allAlerts.push("Location edit Sucessfull");
      this.showsucess(this.allAlerts);
      this.loadMultiple();
    })
    .catch(err =>{
      this.allAlerts = [];
      this.allAlerts.push("Faild To edit Location");
      this.showMsgError(this.allAlerts);
      console.log(err);
    });
  }
  
  deleteLocatio(id:any){
    this.manageRoleService.deleteLocatio(this.userData.token,id,this.editLocation.id)
    .then(sucess =>{
      this.allAlerts = [];
      this.allAlerts.push("Location deleted Sucessfull");
      this.showsucess(this.allAlerts);
      this.loadMultiple();
    })
    .catch(err =>{
      this.allAlerts = [];
      this.allAlerts.push("Faild To deleted Location");
      this.showMsgError(this.allAlerts);
      console.log(err);
    });
  }
}
