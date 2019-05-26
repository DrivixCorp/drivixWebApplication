import { AuthenticationService } from './Services/authentication.service';
import { JqueryCallingService } from './Services/jquery-calling.service';
import { CredentialService } from './Services/credential.service';
import { Component } from '@angular/core';
import { ConnectionService } from 'ng-connection-service';
import { user } from 'src/OOP/classes/user';
import { Router } from '@angular/router';
import { interval, Subscription } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { reject } from 'q';

declare var $:any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'GraduationProject';
  status = 'ONLINE';
  isConnected = true;
  value:any;
  userData:user;
  message:any;
  message2:any;
  arrMessage:any = [];
  arrMessage2:any = [];
  All_arrMessage:any = [];
  arrMessageOfChatBot:any= [];
  checkSend:boolean  = false;
  checkSend2:boolean  = false;
  chKey:any = 0;
  subscription: Subscription;
  data:any = null;

  constructor(private db:AngularFirestore,private connectionService: ConnectionService,private router:Router,
     private jq:JqueryCallingService,public Authentication:AuthenticationService) {
    // check Internet Connection
    this.connectionService.monitor().subscribe(isConnected => {
      this.isConnected = isConnected;
      if (this.isConnected) {
        this.status = "ONLINE";
      }
      else {
        this.status = "OFFLINE";
      }
    })

  //  const source = interval(1000);
 //      this.subscription = source.subscribe(val => this.reviceMessage());


            const things = db.collection('messages/').valueChanges().forEach(element => {
             var arr:any = element;
             var arr2:any = [];
             var arr3:any = [];
             var max = 0;
             var max2 =0;
              for (let index = 0; index < arr.length; index++) {
                if(arr[index].token != this.userData.token){
                  if(arr[index].time > max){
                    max = arr[index].time;
                    arr2 = arr[index];
                  }
                }
                if(arr[index].token == this.userData.token){
                  if(arr[index].time > max2){
                    max2 = arr[index].time;
                    arr3 = arr[index];
                  }
                }
              }
              if(max > max2){
                this.arrMessage2.push(arr2);
                this.All_arrMessage.push(arr2);
                console.log(this.All_arrMessage)
              }
              
              
            });
  }

  ngOnInit() {
    this.jqueryForAppCall();
    
    this.checkAuth();

  //  console.log(this.router.url);
     this.jq.essentialCoding();
     this.userData = this.Authentication.checkAuth();
     if(this.userData == null){
       this.router.navigate(['/home']);
     }
    
      //this.reviceMessage();

      

  }

  jqueryForAppCall(){
    $(function(){

      $(window).scroll(function () {
        if ($(window).scrollTop() >= 250) {
            $('.fixedScroll').fadeIn();
        } else {
            $('.fixedScroll').fadeOut();
        }
      });
      // scroll action
      $('.fixedScroll').on('click', function () {
          $('html, body').animate({
              scrollTop: 0
          }, 1000);
      });

    });
  }

  checkAuth(){
    //localStorage.removeItem('authUser');
    var authUser = localStorage.getItem('authUser');
    var checkUser = JSON.parse(authUser);
    console.log('in Check Auth');
    if(checkUser !== null){
      CredentialService.isAuth = true;
      console.log('successfull auth');
    }
    else{
      CredentialService.isAuth = false;
      console.log('user unautheroized');
    }
  }
  async sendMessage(){
    this.checkSend = true;;
    var ch:boolean = true;
    let testObject:any = {};
    testObject.message  = this.message;
    testObject.token = this.userData.token;
    this.arrMessage.push(this.message);
    this.All_arrMessage.push(testObject);
    $('#sendMss').hide();
     this.data = await
      {
        'name':this.userData.name,
        'token':this.userData.token,
        'message':this.message,
        'time': Date.now()
      };
    const asd = await this.db.collection('messages/').add(this.data).then(res =>  {
     
      $('#sendMss').show();
       ch = false;
    }, err => reject(err));
    this.checkSend = ch;
      this.message = '';
      console.log(this.All_arrMessage)
  }

  async sendMessageChatBot(){
    console.log(this.message2)
    var array33:any = [];
    this.checkSend2 = true;
    var ch:boolean = true;

    let testObject:any = {};
    testObject.message2  = this.message2;
    testObject.token = this.userData.token;
    this.arrMessageOfChatBot.push(testObject);
    $('#sendMss2').hide();
      await $.ajax({
      
      type : 'post',
      
      url : 'http://drivixcorp.com/api/Chatbot',
      
      data:{
        'sentence': this.message2 ,
        'token'   : this.userData.token
      },
      
      success: async function(data:any){
       array33 =  await data;
       array33.token = await "chatbot";
       $('#sendMss2').show();
       ch = await false;
      }
      
      });
      this.arrMessageOfChatBot.push(array33);
      console.log(this.arrMessageOfChatBot)
      this.checkSend2 = ch;
      this.message2 = '';
    }

  /*async reviceMessage(){
    var array44:any = [];
      await $.ajax({
      
      type : 'post',
      
      url : 'http://drivixcorp.com/api/getmessage',

      
      success: async function(data:any){
       array44 =  await data;
       console.log("--------");
        console.log(data);
      }
      });
      if(array44.token != this.userData.token)
     this.arrMessage2.push(array44);
     array44 = [];
  }*/


}
