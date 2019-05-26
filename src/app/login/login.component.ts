import { JqueryCallingService } from './../Services/jquery-calling.service';
import { Router } from '@angular/router';
import { CredentialService } from './../Services/credential.service';
import { Component, OnInit } from '@angular/core';
import { user } from 'src/OOP/classes/user';
import { userInterface } from 'src/OOP/Interfaces/userInterface';
import { NgxUiLoaderService } from 'ngx-ui-loader';

declare var $:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  /* form pattern */

  loginEmail:string;
  loginPassword:string;
  loginRememberMe:boolean=false;


  returnData:userInterface;
  errorCode:number;
  errorMsgs:string[]=[];

  constructor(private Credential:CredentialService,private router:Router,private jq:JqueryCallingService) { }

  ngOnInit() {
    this.jq.essentialCoding();

    // show & hide pass
    this.togglePassword();
  }

  togglePassword(){
    $('section.credential .pass-input i').on('click',function(){
      if($(this).prev().attr('type')=='password'){
        $(this).prev().prop("type", "text");
        $(this).removeClass('fa-eye').addClass('fa-eye-slash')
      }
      else{
        $(this).prev().prop("type", "password");
        $(this).removeClass('fa-eye-slash').addClass('fa-eye')
      }
    });
  }

  checkPassword(){
    var passwordPattern= RegExp("(?!^[0-9]*$)(?!^[a-zA-Z._ ]*$)^([a-z._ A-Z0-9]{5,15})$");
    if(this.loginPassword!=''){
      if(passwordPattern.test(this.loginPassword)){
        return true;
      }
      return false;
    }
    return false;
  }

  checkEmail(){
    var emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(this.loginEmail!=''){
      if(emailPattern.test(this.loginEmail)){
        return true;
      }
      return false;
    }
    return false;
  }

  login() {
    var check_email = this.checkEmail();
    var check_password = this.checkPassword();
    if(check_email === true && check_password === true){
      this.Credential.login(this.loginEmail,this.loginPassword)
      .then(success => {
          this.returnData = success;
          this.authorize();
      })
      .catch(err => {
        this.errorCode = err.status;
        this.showErrorMsg();
      });
    }
    else {
      if(check_email === false){
        this.errorMsgs = [];
        this.errorMsgs.push('Please Enter valid E-mail');
        this.navigateToTopCredentail();
      }
      if(check_password === false){
        this.errorMsgs = [];
        this.errorMsgs.push('Please Enter valid Password contains of 5 to 15 letter and number and can allow [. _] special character ');
        this.navigateToTopCredentail();
      }
    }
  }

  authorize(){

    var authUser = new user();
    
    authUser.id =  this.returnData.id;
    authUser.name = this.returnData.name;
    authUser.email = this.returnData.email;
    authUser.status = this.returnData.status;
    authUser.type = this.returnData.type;
    authUser.token = this.returnData.token;

    if(this.loginRememberMe === true){
      localStorage.setItem('authUser',JSON.stringify(authUser));
    }
    CredentialService.isAuth = true;
    CredentialService.userName = this.returnData.name;

    this.returnData = null;

    // redirect to home-page
    this.router.navigate(['/home']);
  }

  showErrorMsg(){
    this.errorMsgs = [];
    if(this.errorCode == 500){
      this.errorMsgs.push('Email is wrong, please re-check');
    }
    if(this.errorCode == 502){
      this.errorMsgs.push('Password is wrong, please re-check');
    }
    if(this.errorCode == 503){
      this.errorMsgs.push('Please enter valid e-mail and password');
    }
    this.navigateToTopCredentail();
  }

  navigateToTopCredentail(){
    var toScroll = $('.credential').offset().top;
    $('html, body').animate({
      scrollTop: toScroll
    }, 1000);

    $('.formError').show('fast').delay(6000).hide('slow')
  }

}
