import { ProfileService } from './../Services/profile.service';
import { Router } from '@angular/router';
import { AuthenticationService } from './../Services/authentication.service';
import { JqueryCallingService } from './../Services/jquery-calling.service';
import { Component, OnInit, AfterContentInit, AfterViewInit, AfterViewChecked } from '@angular/core';
import { user } from 'src/OOP/classes/user';
import { ProfileInterface } from 'src/OOP/Interfaces/ProfileInterface';
declare var $:any;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit,AfterViewChecked {

  constructor(private jq:JqueryCallingService,public Authentication:AuthenticationService,private router:Router,
    private Profile:ProfileService) { }
  /* form pattern*/
  formPhone:string;
  formDate:Date;
  formJob:string;
  formType:string;

  /* images variable*/
  imagePath:any;
  imgURL: any;
  message: string;
  saveImage:any;

  ProfileData:any = null;
  test:string;

  profileObject:ProfileInterface;
  
  /* err msg */ 
  allAlerts:string[]=[];
  alert:string[]=[];

  UrlAlert:string;
  userData:user;
  errorCode:number;
  

  preview(files :any) {
    this.message= null;
    
    if (files.length === 0)
      return;
 
    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      return;
    }
 
    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]); 
    reader.onload = (_event) => { 
      this.imgURL = reader.result; 
      var str = this.imgURL;
      str = str.substring(str.indexOf(",") + 1);
      this.saveImage = str;
    }
  }
  saveOrUpdateImage(){
    console.log(this.saveImage);
     this.Profile.saveOrUpdateImage(this.userData.token,this.saveImage)
      .then(data =>{
        window.location.reload();
      })
      .catch(err =>{
        //console.log(err.error.msg);
        this.allAlerts = [];
          this.allAlerts.push(err.error.msg);
          this.showMsg(this.allAlerts);
      });
  }
  DeleteImage(){
    this.Profile.DeleteImage(this.userData.token)
    .then(data =>{
      window.location.reload();
    })
    .catch(err =>{
      this.allAlerts = [];
          this.allAlerts.push(err.error.msg);
          this.showMsg(this.allAlerts);
          
    });
  }
  ngAfterViewChecked(){
    if(this.router["browserUrlTree"].queryParams.alert){
      this.UrlAlert = this.router["browserUrlTree"].queryParams.alert;
      console.log(this.router["browserUrlTree"].queryParams.alert);
    }
  }
  ngOnInit() {
   
    this.jq.essentialCoding();
    this.userData = this.Authentication.checkAuth();
    if(this.userData == null){
      this.router.navigate(['/home']);
    }
    
    this.uploadProfileInformation();
  }
  testObject(){
    if(this.ProfileData) return true;
    else return false;
  }
  uploadProfileInformation(){
    if(this.userData){
      this.Profile.showProfile(this.userData.token)
    .then(data =>{
      if(data.id){ 
        this.ProfileData = data;
        console.log(data);
      }
    })
    .catch(err =>{
      console.log(err)
    });
    }
    }
    deleteProfile(){
      if(this.userData){
        this.Profile.DeleteProfile(this.userData.token)
        .then(data =>{
          this.allAlerts = [];
          this.allAlerts.push(data.msg);
          this.showMsg(this.allAlerts);
          
          //this.router.navigate(['/profile']);
          //this.router.navigateByUrl('/profile', {skipLocationChange: true}).then(()=>
          //this.router.navigate(["profile"])); 
          //location.href = location.protocol + '//' + location.host + location.pathname + "/?alert=" + this.allAlerts;    
          window.location.reload();
        })
        .catch(err =>{
          this.allAlerts = [];
          this.allAlerts.push("Delete Faild");
          this.showMsg(this.allAlerts);
          console.log(err);
        });
      }
      
    }
  checkPhone(phone:any){
    if(phone){
      return true;
    }
    return false;
  }

  checkDate(DateOfBirth:any){
    if(DateOfBirth){
      return true;
    }
    return false;
  }

  checkJob(job:any){
    if(job){
      return true;
    }
    return false;
  }
  checkType(gender:any){
    if(gender){
      return true;
    }
    return false;
  }

  showMsg(Messsage:any){
    this.alert = [];
    for (let index = 0; index < Messsage.length; index++) {
      this.alert.push(Messsage[index]);
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

  saveOrUpdateProfileData(S_or_U:number){
    
    if(S_or_U==1){
      var check_phone = this.checkPhone(this.formPhone);
      var check_date = this.checkDate(this.formDate);
      var check_job = this.checkJob(this.formJob);
      var check_type = this.checkType(this.formType);

    }
    else if(S_or_U == 2){
      if(this.ProfileData)
      var check_phone = this.checkPhone(this.ProfileData.phone);
      var check_date = this.checkDate(this.ProfileData.DOB);
      var check_job = this.checkJob(this.ProfileData.job);
      var check_type = this.checkType(this.ProfileData.gender);
       this.formPhone = this.ProfileData.phone;
       this.formDate = this.ProfileData.DOB;
       this.formJob = this.ProfileData.job;
       this.formType = this.ProfileData.gender;
    }
    if(check_phone === true && check_date === true &&  check_job === true && check_type === true){
      
      this.Profile.saveOrUpdateProfileData(this.formPhone,this.formDate,this.formJob,this.formType,this.userData.token,S_or_U)
      .then(success => {
        if(success.msg){
          this.allAlerts = [];
          this.allAlerts.push(success.msg);
          this.showMsg(this.allAlerts);
           
        }
        this.router.navigate(['/profile']);
        //location.href = location.protocol + '//' + location.host + location.pathname + "/?alert=" + this.allAlerts;
        window.location.reload();
      })
      .catch(err => {
        this.allAlerts = [];
        if(err.error.msg) this.allAlerts.push(err.error.msg);
          if(err.error.phone){
            for (let index = 0; index < (err.error.phone).length; index++) {
              this.allAlerts.push(err.error.phone[index]);
            }
          }

          if(err.error.gender){
            for (let index = 0; index < (err.error.gender).length; index++) {
              this.allAlerts.push(err.error.gender[index]);
            }
          }

          if(err.error.DOB){
            for (let index = 0; index < (err.error.DOB).length; index++) {
              this.allAlerts.push(err.error.DOB[index]);
            }
          }

          if(err.error.location){
            for (let index = 0; index < (err.error.location).length; index++) {
              this.allAlerts.push(err.error.location[index]);
            }
          }

          if(err.error.job){
            for (let index = 0; index < (err.error.job).length; index++) {
              this.allAlerts.push(err.error.job[index]);
            }
          }
        
        this.showMsg(this.allAlerts);
      });
    }
    else {
      this.allAlerts = [];
      if(check_phone === false){
        this.allAlerts.push('Please Enter Valid Phone');
      }
      if(check_date === false){
        this.allAlerts.push('Please Enter Valid Date');
      }
      if(check_job === false){
        this.allAlerts.push('Please Enter Valid Job');
      }
      if(check_type === false){
        this.allAlerts.push('Please Chosse male or female');
      }
      if(this.allAlerts){
        this.showMsg(this.allAlerts);
      }
      
    }
  }
}
