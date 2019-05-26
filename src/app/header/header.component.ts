import { CredentialService } from './../Services/credential.service';
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileService } from './../Services/profile.service';
import { AuthenticationService } from './../Services/authentication.service';
import { JqueryCallingService } from './../Services/jquery-calling.service';
import { user } from 'src/OOP/classes/user';
import { ProfileInterface } from 'src/OOP/Interfaces/ProfileInterface';
declare var $:any;
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit  {

  auth:boolean;
  userName:string;

  keywords:string[] = ["System",'Power','Engine','Turbo','Headlights','Brake','Wheel'];

  //profile variable
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

  constructor(public router:Router,private jq:JqueryCallingService,public Authentication:AuthenticationService,
    private Profile:ProfileService) {
    this.checkAuth();
  }

  checkAuth(){
    this.router.events.subscribe((val)=>{
      this.auth = CredentialService.isAuth;
      var getUser = localStorage.getItem('authUser');
      var authUser = JSON.parse(getUser);
      if(authUser != null){
        this.userName = authUser.name;
      }
      else if(CredentialService.userName != null){
        this.userName = CredentialService.userName
      }
    });
  }

  ngOnInit() {
    this.jqueryCalling();

    //profile
    this.jq.essentialCoding();
    this.userData = this.Authentication.checkAuth();
    if(this.userData == null){
      this.router.navigate(['/home']);
    }
    
    this.uploadProfileInformation();
  }

  jqueryCalling(){
    $(function(){
      // hide top-bar while scrolling
      $(window).scroll(function(){
        if($(window).scrollTop()<10){
          $('.header1').slideDown("slow");
          $('.navbar-expand-lg .navbar-nav .nav-link').css({
            'padding-right':'.5rem',
            'transition':'1.5s'
          });
        }
        else{
          $('.header1').slideUp("slow");
          $('.navbar-expand-lg .navbar-nav .nav-link').css({
            'padding-right':'1rem',
            'transition':'1.5s'
          });
        }
      });

      // show drop-down-menu
      $('header.app-header li.dropdown, div.icons div.dropdown').hover(function() {
        $(this).find('.dropdown-menu').stop(true, true).delay(200).fadeIn(600);
      }, function() {
        $(this).find('.dropdown-menu').stop(true, true).delay(200).fadeOut(600);
      });

      // class container on the toolbar
      
      if($(window).outerWidth() < 992){
        $('section.toolbar > div, .header > div').removeClass('container-fluid').addClass('container');
      }
      else{
        $('section.toolbar > div, .header > div').addClass('container-fluid').removeClass('container');
      }
      $(window).on('resize', function(){
        if($(window).outerWidth() < 992){
          $('section.toolbar > div, .header > div').removeClass('container-fluid').addClass('container');
        }
        else{
          $('section.toolbar > div, .header > div').addClass('container-fluid').removeClass('container');
        }
      });

    }); 
  }

  logout(){
    localStorage.removeItem('authUser');
    CredentialService.isAuth = false;
    window.location.reload();
    this.router.navigate(['/home']);
  }

  //start profile

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
        this.uploadProfileInformation();
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
      this.uploadProfileInformation();
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
        console.log(this.ProfileData);
      }
    })
    .catch(err =>{
      console.log(err);
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
          this.uploadProfileInformation();
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
        this.uploadProfileInformation();
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
