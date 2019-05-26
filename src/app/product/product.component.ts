import { AuthenticationService } from './../Services/authentication.service';
import { ManageRolesService } from './../Services/manage-roles.service';
import { JqueryCallingService } from './../Services/jquery-calling.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { user } from 'src/OOP/classes/user';
declare var $:any;
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

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


//comments
AllComments:any = [];
editCommets:any;
errComment:any ="";

 /*Product variable*/
 P_Brand:any;
 P_Price:any;
 P_Description:any;
 P_Name:any;
 AllProduct:any = [];
 mangeProduct:any = [];
 id:any;
 productImage:any;
 role_id:any;
public constructor(
 private router:Router,private manageRoleService:ManageRolesService,
    private jq:JqueryCallingService,public Authentication:AuthenticationService,
    private route:ActivatedRoute) {
 this.route.queryParams.subscribe(params => {
     this.id = params["Data"];
     this.role_id = params["Data2"];
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
  this.manageRoleService.getAllProduct(this.userData.token,this.id)
    .then(data =>{
      this.AllProduct = data;
      console.log(this.AllProduct);
    })
    .catch(err =>{
      console.log(err);
    });
}

testObject(){
  if(this.AllProduct) return true;
  else return false;
}
testObject2(){
  if(this.productImage) return true;
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

   addProduct(){
    this.manageRoleService.addProduct(this.userData.token,this.P_Brand,this.P_Price,this.id,this.P_Description,this.P_Name,)
    .then(sucess =>{
      this.allAlerts = [];
      this.allAlerts.push("Product Add Sucseefully");
      this.showsucess(this.allAlerts);
      this.loadMultiple();
    })
    .catch(err =>{
      this.allAlerts = [];
      if(err.error.msg) this.allAlerts.push(err.error.msg);
      if(err.error.name){
        for (let index = 0; index < (err.error.name).length; index++) {
          this.allAlerts.push(err.error.name[index]);
        }
      }
      if(err.error.brand){
        for (let index = 0; index < (err.error.brand).length; index++) {
          this.allAlerts.push(err.error.brand[index]);
        }
      }
      if(err.error.price){
        for (let index = 0; index < (err.error.price).length; index++) {
          this.allAlerts.push(err.error.price[index]);
        }
      }
      if(err.error.sparesshop_id){
        for (let index = 0; index < (err.error.sparesshop_id).length; index++) {
          this.allAlerts.push(err.error.sparesshop_id[index]);
        }
      }
      if(err.error.description){
        for (let index = 0; index < (err.error.description).length; index++) {
          this.allAlerts.push(err.error.description[index]);
        }
      }
      this.showMsgError(this.allAlerts);
    });
  }
  passProductData(data:any){
    this.mangeProduct = data;
  }

  editProduct(){
    this.manageRoleService.editProduct(this.userData.token,this.mangeProduct.brand,this.mangeProduct.price,this.mangeProduct.id,this.mangeProduct.description,this.mangeProduct.name)
    .then(sucess =>{
      this.allAlerts = [];
      this.allAlerts.push("Product Edit Sucseefully");
      this.showsucess(this.allAlerts);
      this.loadMultiple();
    })
    .catch(err =>{
      this.allAlerts = [];
      if(err.error.msg) this.allAlerts.push(err.error.msg);
      if(err.error.name){
        for (let index = 0; index < (err.error.name).length; index++) {
          this.allAlerts.push(err.error.name[index]);
        }
      }
      if(err.error.brand){
        for (let index = 0; index < (err.error.brand).length; index++) {
          this.allAlerts.push(err.error.brand[index]);
        }
      }
      if(err.error.price){
        for (let index = 0; index < (err.error.price).length; index++) {
          this.allAlerts.push(err.error.price[index]);
        }
      }
      if(err.error.productID){
        for (let index = 0; index < (err.error.productID).length; index++) {
          this.allAlerts.push(err.error.productID[index]);
        }
      }
      if(err.error.description){
        for (let index = 0; index < (err.error.description).length; index++) {
          this.allAlerts.push(err.error.description[index]);
        }
      }
      this.showMsgError(this.allAlerts);
    });
  }
  deleteProduct(){
    this.manageRoleService.deleteProduct(this.userData.token,this.mangeProduct.id)
    .then(sucess =>{
      this.allAlerts = [];
      this.allAlerts.push("Product Deleted Sucseefully");
      this.showsucess(this.allAlerts);
      this.loadMultiple();
    })
    .catch(err =>{
      this.allAlerts = [];
      if(err.error.msg) this.allAlerts.push(err.error.msg);
      if(err.error.productID){
        for (let index = 0; index < (err.error.productID).length; index++) {
          this.allAlerts.push(err.error.productID[index]);
        }
      }
      this.showMsgError(this.allAlerts);
    });
  }

  //preview2(files :any) {
    //this.imgURL2 = [];
    //console.log(files)
    //this.message2= null;
    
    //if (files.length === 0)
     // return;
  
//    var mimeType :any = [] ;
 //   for (let i = 0; i < files.length; i++) {
  //   mimeType [i] = files[i].type;
   //  if (mimeType[i].match(/image\/*/) == null) {
    //  this.message2 = "Only images are supported.";
     // return;
   // }
    //}
    
  
    //var reader:any = [];
    //this.imagePath2 = files;
    //for (let i = 0; i < files.length; i++) {
     //  reader[i] = new FileReader();
      //reader[i].readAsDataURL(files[i]);        
   // } 
   // console.log(reader);
    //for (let i = 0; i < reader.length; i++) {
     // reader[i].onload = (_event:any) => { 
      //  this.imgURL2[i] = reader[i].result; 
       // var str = this.imgURL2[i];
        //str = str.substring(str.indexOf(",") + 1);
        //this.saveImage2.push(str);
     // }
    //}
  //}
  passDataProduct(data:any){
    this.productImage = data;
    console.log(this.productImage);
  }

  addProductImage(){
    console.log("------------------ss------")
    console.log(this.saveImage);
    console.log(this.id)
    console.log(this.productImage.id)
    this.manageRoleService.addImagesForProduct(this.userData.token,this.role_id,0,this.saveImage,this.productImage.id)
     .then(data =>{
       console.log(data);
       this.imgURL = [];
       this.loadMultiple();
     })
     .catch(err =>{
       this.saveImage= [];
       this.allAlerts = [];
       this.allAlerts.push("Faild2 To Add Image");
       this.showMsgError(this.allAlerts);
     });
   }
   deleteProductImage(imageID:any,product:any,i:any){
        this.manageRoleService.deleteImagesForProduct(this.userData.token,this.role_id,imageID,product.id)
        .then(data =>{
          this.allAlerts = [];
          this.allAlerts.push("Sucessfully Delete");
          this.showsucess(this.allAlerts);
         // this.loadMultiple();
         window.location.reload();
        })
        .catch(err =>{
          console.log(err);
          this.saveImage = [];
          this.allAlerts = [];
          this.allAlerts.push("Faild27777 Delete");
          this.showMsgError(this.allAlerts);
          
        });
        
      }

}
