import { JqueryCallingService } from './../Services/jquery-calling.service';
import { Router } from '@angular/router';
import { CredentialService } from './../Services/credential.service';
import { Component, OnInit } from '@angular/core';
import { userInterface } from 'src/OOP/Interfaces/userInterface';
import { user } from 'src/OOP/classes/user';
declare var $:any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

/* form pattern */
  formEmail:string;
  formPassword:string;
  formName:string;

  returnData:userInterface;
  errorCode:number;
  errorMsgs:string[]=[];

  constructor(private Credential:CredentialService,private router:Router,private jq:JqueryCallingService) { }

  ngOnInit() {
    this.jq.essentialCoding();
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
    if(this.formPassword!=''){
      if(passwordPattern.test(this.formPassword)){
        return true;
      }
      return false;
    }
    return false;
  }

  checkEmail(){
    var emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(this.formEmail!=''){
      if(emailPattern.test(this.formEmail)){
        return true;
      }
      return false;
    }
    return false;
  }

  checkName(){
    var namePattern= RegExp("^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z ]*)*$");
    if(this.formName!=''){
      if(namePattern.test(this.formName)){
        return true;
      }
      return false;
    }
    return false;
  }

  register() {
    var check_email = this.checkEmail();
    var check_password = this.checkPassword();
    var check_name = this.checkName();
    if(check_email === true && check_password === true && check_name === true){
      this.Credential.register(this.formEmail,this.formPassword,this.formName)
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
      if(check_name === false){
        this.errorMsgs = [];
        this.errorMsgs.push('Please Enter valid Name');
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

    localStorage.setItem('authUser',JSON.stringify(authUser));
  
    CredentialService.isAuth = true;

    console.log(CredentialService.isAuth);
    this.returnData = null;

    // redirect to home-page
    this.router.navigate(['/home']);
  }

  showErrorMsg(){
    this.errorMsgs = [];
    if(this.errorCode == 500){
      this.errorMsgs.push('Email is already exists');
    }
    if(this.errorCode == 503){
      this.errorMsgs.push('Please enter valid data');
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
