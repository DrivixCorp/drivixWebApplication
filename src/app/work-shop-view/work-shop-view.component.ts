import { AuthenticationService } from './../Services/authentication.service';
import { JqueryCallingService } from './../Services/jquery-calling.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { ManageRolesService } from '../Services/manage-roles.service';
import { user } from 'src/OOP/classes/user';

import {ViewChild, ElementRef, NgZone } from '@angular/core';
import { MapsAPILoader, MouseEvent } from '@agm/core';
import { enableBindings } from '@angular/core/src/render3';
declare var $:any;
@Component({
  selector: 'app-work-shop-view',
  templateUrl: './work-shop-view.component.html',
  styleUrls: ['./work-shop-view.component.css']
})
export class WorkShopViewComponent implements OnInit {
    formPhone:string;
    /* err msg */ 
    allAlerts:string[]=[];
    alertErr:string[]=[];
    alertSuc:string[]=[];
  
    UrlAlert:string;
    userData:user;
    errorCode:number;
    types_workShop:any;
  
  
    splitted_workingDay:any;
    arr_WorkingDay:any = [];

    editLocation:any;
    
    roleID:any;
    type:any;
    AllData:any;
    phoneData:any;

    workingDays_workshop:any="";
    workshopType2:any = [];

    //comments
    AllComments:any = [];
    editCommets:any;
    errComment:any ="";

     /* images variable*/
  imagePath:any;
  imgURL: any = [];
  message: string;
  saveImage:any = [];

  //location
  title: string = 'AGM project';
  latitude: number;
  longitude: number;
  zoom: number;
  address: string;
  private geoCoder:any;
  colorLike:any;
  @ViewChild('search')
  public searchElementRef: ElementRef;

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
  goToOffer(){
    let navigationExtras: NavigationExtras = {
      queryParams: {
          "Data": this.AllData.carservice.carserviceoffers.id,
          "Data2": this.AllData.id,
          "Data3" :this.type
      },
      //skipLocationChange: true
  };
  this.router.navigate(["offer"], navigationExtras);
  }

  loadMultiple(){
    this.manageRoleService.viewProviderRoleWithDetailes(this.userData.token,this.roleID,this.type)
    .then(data =>{
      console.log("-*-*-*-*-*-*-*-*-*-*-*-");
        console.log(data);
        this.AllData = data;
        this.manageRoleService.getComments(this.userData.token,this.AllData.id)
        .then(s =>{
          this.editCommets = s[0];
         // console.log(s);
         this.AllComments =[];
         for (let i = 0; i < s[0].length; i++) {
           if(!s[0][i].comment_id){
             this.AllComments.push(s[0][i]);
           }
         }
           
        //  console.log(this.AllComments[0].commentlikes.length)
        this.AllComments[0].commentlikes[0].userToken ="asas";
          for (let i = 0; i < this.AllComments.length; i++) {
           this.AllComments[i].liketype = -1;
             for (let y = 0; y < this.AllComments[i].commentlikes.length; y++) {
                 if(this.AllComments[i].commentlikes[y].userToken == this.userData.token){
                   if(this.AllComments[i].commentlikes[y].like == 1){
                     this.AllComments[i].liketype = 1;
                   }
                   else if(this.AllComments[i].commentlikes[y].like == 0){
                     this.AllComments[i].liketype = 0;
                   }
                 }
                 else{
                   this.AllComments[i].liketype = -1;
                 }
             }
             for (let x = 0; x < this.AllComments[i].replay.length; x++) {
               this.AllComments[i].replay[x].liketype = -1;
               for (let z = 0; z < this.AllComments[i].replay[x].commentlikes.length; z++) {
                 if(this.AllComments[i].replay[x].commentlikes[z].token == this.userData.token){
                   if(this.AllComments[i].replay[x].commentlikes[z].like == 1){
                     this.AllComments[i].replay[x].liketype = 1;
                   }
                   else if(this.AllComments[i].replay[x].commentlikes[z].like == 0){
                     this.AllComments[i].replay[x].liketype = 0;
                   }
                 }
                 else{
                   this.AllComments[i].replay[x].liketype = -1;
                 }
             }
             }
          }
          console.log("--------")
         console.log(this.AllComments);
         this.AllComments[0].userToken ="sasa";
         

        })
        .catch(e =>{
           console.log(e);
        });
       // this.AllData.workshopType = "";
        this.splitted_workingDay = this.AllData.workingdays.split(","); 
        this.arr_WorkingDay[0] = this.splitted_workingDay.includes('friday');
        this.arr_WorkingDay[1] = this.splitted_workingDay.includes('saturday');
        this.arr_WorkingDay[2] = this.splitted_workingDay.includes('sunday');
        this.arr_WorkingDay[3] = this.splitted_workingDay.includes('monday');
        this.arr_WorkingDay[4] = this.splitted_workingDay.includes('tuesday');
        this.arr_WorkingDay[5] = this.splitted_workingDay.includes('wensday');
        this.arr_WorkingDay[6] = this.splitted_workingDay.includes('thursday');  

        
        
   
        console.log(this.AllData);
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

    this.manageRoleService.viewWorkShopTypes(this.userData.token)
   .then(success =>{
     this.types_workShop = success;
     console.log(this.types_workShop);
   })
   .catch(err =>{
     console.log(err);
   });
    
    // statt location
       //load Places Autocomplete
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

  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = -position.coords.latitude;
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
 
  getAddress(latitude, longitude) {
    this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
      console.log(results);
      console.log(status);
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

saveOrUpdateWorkshop(type:any,roleID:any){
    console.log(this.arr_WorkingDay);

    
    var i = 0;
    var Types_workShop:any = [];
    $(".workshoptypes:checked").each(function() {
      
      Types_workShop.push($(this).val());
      i++;
    });
    console.log(Types_workShop);
   // var Types_workShop:any = ["1","2"];

   
    
    this.workingDays_workshop="";

    if(this.arr_WorkingDay[1]) this.workingDays_workshop= this.workingDays_workshop  + "saturday,";
    if(this.arr_WorkingDay[2]) this.workingDays_workshop= this.workingDays_workshop    + "sunday,";
    if(this.arr_WorkingDay[3]) this.workingDays_workshop= this.workingDays_workshop    + "monday,";
    if(this.arr_WorkingDay[4]) this.workingDays_workshop= this.workingDays_workshop   + "tuesday,";
    if(this.arr_WorkingDay[5]) this.workingDays_workshop= this.workingDays_workshop   + "wensday,";
    if(this.arr_WorkingDay[6]) this.workingDays_workshop= this.workingDays_workshop  + "thursday,";
    if(this.arr_WorkingDay[0]) this.workingDays_workshop= this.workingDays_workshop    + "friday,";
    if(this.workingDays_workshop) this.workingDays_workshop = this.workingDays_workshop.slice(0,-1);
    this.manageRoleService.AddWorkShop(this.userData.token,type,this.workingDays_workshop,this.AllData.name,
      this.AllData.description,this.AllData.work_to,this.AllData.work_from,roleID,this.AllData.carservice.URL,Types_workShop)
      .then(success =>{
        //console.log(success);
        this.allAlerts = [];
          this.allAlerts.push("Edit SucessFully");
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
passDataLocation(data:any,lat:any,long:any){
  this.editLocation = data;
  
  console.log(this.editLocation);
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
  
addComment(comment:any,red_id:any){

 if(comment.lenght != 0){
  this.manageRoleService.addComment(this.userData.token,this.AllData.id,comment,red_id)
  .then(success =>{
    console.log(success)
    this.manageRoleService.getComments(this.userData.token,this.AllData.id)
         .then(s =>{
          // console.log(s);
          this.editCommets = s[0];
          this.AllComments =[];
          for (let i = 0; i < s[0].length; i++) {
            if(!s[0][i].comment_id){
              this.AllComments.push(s[0][i]);
            }
          }
          //  console.log(this.AllComments[0].commentlikes.length)
          this.AllComments[0].commentlikes[0].userToken ="asas";
            for (let i = 0; i < this.AllComments.length; i++) {
             this.AllComments[i].liketype = -1;
               for (let y = 0; y < this.AllComments[i].commentlikes.length; y++) {
                   if(this.AllComments[i].commentlikes[y].userToken == this.userData.token){
                     if(this.AllComments[i].commentlikes[y].like == 1){
                       this.AllComments[i].liketype = 1;
                     }
                     else if(this.AllComments[i].commentlikes[y].like == 0){
                       this.AllComments[i].liketype = 0;
                     }
                   }
                   else{
                     this.AllComments[i].liketype = -1;
                   }
               }
               for (let x = 0; x < this.AllComments[i].replay.length; x++) {
                 this.AllComments[i].replay[x].liketype = -1;
                 for (let z = 0; z < this.AllComments[i].replay[x].commentlikes.length; z++) {
                   if(this.AllComments[i].replay[x].commentlikes[z].token == this.userData.token){
                     if(this.AllComments[i].replay[x].commentlikes[z].like == 1){
                       this.AllComments[i].replay[x].liketype = 1;
                     }
                     else if(this.AllComments[i].replay[x].commentlikes[z].like == 0){
                       this.AllComments[i].replay[x].liketype = 0;
                     }
                   }
                   else{
                     this.AllComments[i].replay[x].liketype = -1;
                   }
               }
               }
            }
            console.log("--------")
           console.log(this.AllComments);
           this.AllComments[0].userToken ="sasa";
          

         })
         .catch(e =>{
            console.log(e);
         });
  })
  .catch(err =>{
  console.log(err)
  });
 }
 else{
   alert("Comment Is Empty");
 }
}
editComment(comment:any,id:any){
  console.log(comment.length)
 if(comment.length != 0){
  this.manageRoleService.editComment(this.userData.token,comment,id)
  .then(success =>{
    console.log(success)
    this.manageRoleService.getComments(this.userData.token,this.AllData.id)
         .then(s =>{
           // console.log(s);
           this.editCommets = s[0];
           this.AllComments =[];
           for (let i = 0; i < s[0].length; i++) {
            if(!s[0][i].comment_id){
              this.AllComments.push(s[0][i]);
            }
          }
         //  console.log(this.AllComments[0].commentlikes.length)
         this.AllComments[0].commentlikes[0].userToken ="asas";
           for (let i = 0; i < this.AllComments.length; i++) {
            this.AllComments[i].liketype = -1;
              for (let y = 0; y < this.AllComments[i].commentlikes.length; y++) {
                  if(this.AllComments[i].commentlikes[y].userToken == this.userData.token){
                    if(this.AllComments[i].commentlikes[y].like == 1){
                      this.AllComments[i].liketype = 1;
                    }
                    else if(this.AllComments[i].commentlikes[y].like == 0){
                      this.AllComments[i].liketype = 0;
                    }
                  }
                  else{
                    this.AllComments[i].liketype = -1;
                  }
              }
              for (let x = 0; x < this.AllComments[i].replay.length; x++) {
                this.AllComments[i].replay[x].liketype = -1;
                for (let z = 0; z < this.AllComments[i].replay[x].commentlikes.length; z++) {
                  if(this.AllComments[i].replay[x].commentlikes[z].token == this.userData.token){
                    if(this.AllComments[i].replay[x].commentlikes[z].like == 1){
                      this.AllComments[i].replay[x].liketype = 1;
                    }
                    else if(this.AllComments[i].replay[x].commentlikes[z].like == 0){
                      this.AllComments[i].replay[x].liketype = 0;
                    }
                  }
                  else{
                    this.AllComments[i].replay[x].liketype = -1;
                  }
              }
              }
           }
           console.log("--------")
          console.log(this.AllComments);
          this.AllComments[0].userToken ="sasa";
          

         })
         .catch(e =>{
            console.log(e);
         });
  })
  .catch(err =>{
  console.log(err)
  });
 }
 else{
   alert("Comment Is Empty");
 }
}
deleteComment(id:any){
  this.manageRoleService.deleteComment(this.userData.token,id)
  .then(success =>{
    console.log(success)
    this.manageRoleService.getComments(this.userData.token,this.AllData.id)
         .then(s =>{
          // console.log(s);
          this.editCommets = s[0];
          this.AllComments =[];
          for (let i = 0; i < s[0].length; i++) {
            if(!s[0][i].comment_id){
              this.AllComments.push(s[0][i]);
            }
          }
          //  console.log(this.AllComments[0].commentlikes.length)
          this.AllComments[0].commentlikes[0].userToken ="asas";
            for (let i = 0; i < this.AllComments.length; i++) {
             this.AllComments[i].liketype = -1;
               for (let y = 0; y < this.AllComments[i].commentlikes.length; y++) {
                   if(this.AllComments[i].commentlikes[y].userToken == this.userData.token){
                     if(this.AllComments[i].commentlikes[y].like == 1){
                       this.AllComments[i].liketype = 1;
                     }
                     else if(this.AllComments[i].commentlikes[y].like == 0){
                       this.AllComments[i].liketype = 0;
                     }
                   }
                   else{
                     this.AllComments[i].liketype = -1;
                   }
               }
               for (let x = 0; x < this.AllComments[i].replay.length; x++) {
                 this.AllComments[i].replay[x].liketype = -1;
                 for (let z = 0; z < this.AllComments[i].replay[x].commentlikes.length; z++) {
                   if(this.AllComments[i].replay[x].commentlikes[z].token == this.userData.token){
                     if(this.AllComments[i].replay[x].commentlikes[z].like == 1){
                       this.AllComments[i].replay[x].liketype = 1;
                     }
                     else if(this.AllComments[i].replay[x].commentlikes[z].like == 0){
                       this.AllComments[i].replay[x].liketype = 0;
                     }
                   }
                   else{
                     this.AllComments[i].replay[x].liketype = -1;
                   }
               }
               }
            }
            console.log("--------")
           console.log(this.AllComments);
           this.AllComments[0].userToken ="sasa";
          

         })
         .catch(e =>{
            console.log(e);
         });
  })
  .catch(err =>{
  console.log(err)
  });
}
estimateComment(estimate:any,id:any){
  this.manageRoleService.addEstimateComment(this.userData.token,this.AllData.id,estimate,id)
  .then(success =>{
    //console.log(success)
    this.manageRoleService.getComments(this.userData.token,this.AllData.id)
         .then(s =>{
           // console.log(s);
           this.editCommets = s[0];
           this.AllComments =[];
           for (let i = 0; i < s[0].length; i++) {
            if(!s[0][i].comment_id){
              this.AllComments.push(s[0][i]);
            }
          }
         //  console.log(this.AllComments[0].commentlikes.length)
         this.AllComments[0].commentlikes[0].userToken ="asas";
           for (let i = 0; i < this.AllComments.length; i++) {
            this.AllComments[i].liketype = -1;
              for (let y = 0; y < this.AllComments[i].commentlikes.length; y++) {
                  if(this.AllComments[i].commentlikes[y].userToken == this.userData.token){
                    if(this.AllComments[i].commentlikes[y].like == 1){
                      this.AllComments[i].liketype = 1;
                    }
                    else if(this.AllComments[i].commentlikes[y].like == 0){
                      this.AllComments[i].liketype = 0;
                    }
                  }
                  else{
                    this.AllComments[i].liketype = -1;
                  }
              }
              for (let x = 0; x < this.AllComments[i].replay.length; x++) {
                this.AllComments[i].replay[x].liketype = -1;
                for (let z = 0; z < this.AllComments[i].replay[x].commentlikes.length; z++) {
                  if(this.AllComments[i].replay[x].commentlikes[z].token == this.userData.token){
                    if(this.AllComments[i].replay[x].commentlikes[z].like == 1){
                      this.AllComments[i].replay[x].liketype = 1;
                    }
                    else if(this.AllComments[i].replay[x].commentlikes[z].like == 0){
                      this.AllComments[i].replay[x].liketype = 0;
                    }
                  }
                  else{
                    this.AllComments[i].replay[x].liketype = -1;
                  }
              }
              }
           }
           console.log("--------")
          console.log(this.AllComments);
          this.AllComments[0].userToken ="sasa";
          

         })
         .catch(e =>{
            console.log(e);
         });
  })
  .catch(err =>{
  console.log(err)
  });
}
deleteestimateComment(id:any){
  this.manageRoleService.deleteEstimateComment(this.userData.token,id)
  .then(success =>{
    //console.log(success)
    this.manageRoleService.getComments(this.userData.token,this.AllData.id)
         .then(s =>{
           // console.log(s);
           this.editCommets = s[0];
           this.AllComments =[];
           for (let i = 0; i < s[0].length; i++) {
            if(!s[0][i].comment_id){
              this.AllComments.push(s[0][i]);
            }
          }
         //  console.log(this.AllComments[0].commentlikes.length)
         this.AllComments[0].commentlikes[0].userToken ="asas";
           for (let i = 0; i < this.AllComments.length; i++) {
            this.AllComments[i].liketype = -1;
              for (let y = 0; y < this.AllComments[i].commentlikes.length; y++) {
                  if(this.AllComments[i].commentlikes[y].userToken == this.userData.token){
                    if(this.AllComments[i].commentlikes[y].like == 1){
                      this.AllComments[i].liketype = 1;
                    }
                    else if(this.AllComments[i].commentlikes[y].like == 0){
                      this.AllComments[i].liketype = 0;
                    }
                  }
                  else{
                    this.AllComments[i].liketype = -1;
                  }
              }
              for (let x = 0; x < this.AllComments[i].replay.length; x++) {
                this.AllComments[i].replay[x].liketype = -1;
                for (let z = 0; z < this.AllComments[i].replay[x].commentlikes.length; z++) {
                  if(this.AllComments[i].replay[x].commentlikes[z].token == this.userData.token){
                    if(this.AllComments[i].replay[x].commentlikes[z].like == 1){
                      this.AllComments[i].replay[x].liketype = 1;
                    }
                    else if(this.AllComments[i].replay[x].commentlikes[z].like == 0){
                      this.AllComments[i].replay[x].liketype = 0;
                    }
                  }
                  else{
                    this.AllComments[i].replay[x].liketype = -1;
                  }
              }
              }
           }
           console.log("--------")
          console.log(this.AllComments);
          this.AllComments[0].userToken ="sasa";
          

         })
         .catch(e =>{
            console.log(e);
         });
  })
  .catch(err =>{
  console.log(err)
  });
}

editInput(ID:any){
 for (let i = 0; i < this.editCommets.length; i++) {
   if(ID != this.editCommets[i].id){
    $("#editInput"+this.editCommets[i].id).prop('disabled', true);
    $("#editInput"+this.editCommets[i].id).removeClass("inputOfComment2");
    $(".iconEdit"+this.editCommets[i].id).hide();
  }
  else{
    $("#editInput"+ID).prop('disabled', false);
    $("#editInput"+ID).addClass("inputOfComment2");
    $(".iconEdit"+ID).show();
  }
 }
}
removeeditComment(id:any){
     $("#editInput"+id).prop('disabled', true);
     $("#editInput"+id).removeClass("inputOfComment2");
     $(".iconEdit"+id).hide();
  }
}
