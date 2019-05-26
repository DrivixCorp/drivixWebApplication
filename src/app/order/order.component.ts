import { AuthenticationService } from './../Services/authentication.service';
import { ManageRolesService } from './../Services/manage-roles.service';
import { JqueryCallingService } from './../Services/jquery-calling.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { user } from 'src/OOP/classes/user';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  userData:user;
  Order:any;
  id:any;
  public constructor(
    private router:Router,private manageRoleService:ManageRolesService,
       private jq:JqueryCallingService,public Authentication:AuthenticationService,
       private route:ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
        this.id = params["Data"];

    });
   }
   
   ngOnInit() {
   
    this.jq.essentialCoding();
   this.userData = this.Authentication.checkAuth();
   if(this.userData == null){
     this.router.navigate(['/home']);
   }
    this.loadMultipe();
   }
   loadMultipe(){
     this.manageRoleService.getOrders(this.userData.id,this.id)
     .then(data =>{
      console.log(data);
      this.Order = data;
     })
     .catch(err =>{
      console.log(err);
     });
   }
}
