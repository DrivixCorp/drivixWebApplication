import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class ManageRolesService {

  private host:string = 'http://www.drivixcorp.com/api/';
  constructor(public http: HttpClient) { }


  viewProviderRole(token:any){
    var loginAPI = this.host + 'getProviderRoles';
      return new Promise<any>((resolve, reject) => {
        this.http.post<any>(loginAPI, JSON.stringify({}), {
          params: new HttpParams().set('token',token)
        })
          .subscribe(res => {
            resolve(res);
          }, (err) => {
            reject(err);
          });
      });
  }
  viewProviderRoleWithDetailes(token:any,roleID:any,type:any){
    var loginAPI = this.host + 'getProviderRoleDetails';
      return new Promise<any>((resolve, reject) => {
        this.http.post<any>(loginAPI, JSON.stringify({}), {
          params: new HttpParams().set('token',token).append('roleID',roleID).append('type',type)
        })
          .subscribe(res => {
            resolve(res);
          }, (err) => {
            reject(err);
          });
      });
  }
  AddWinchDriver(token:any,Type:any,Workingdays:any,name:any,description:any,work_to:any,work_from:any,roleID:any,price_per_km:any,winchcompany_id:any){
    var loginAPI = this.host + 'userManageRole';
      return new Promise<any>((resolve, reject) => {
        this.http.post<any>(loginAPI, JSON.stringify({}), {
          params: new HttpParams().set('token',token).append('type',Type).append('workingdays',Workingdays)
            .append('name',name).append("description",description).append("work_to",work_to).append("winchcompany_id",winchcompany_id)
            .append("work_from",work_from).append("roleID",roleID).append("price_per_km",price_per_km)
        })
          .subscribe(res => {
            resolve(res);
          }, (err) => {
            reject(err);
          });
      });
  }
  AddWinchDriverForSpecificCompany(token:any,role_id:any,email:any,password:any,price_per_km:any,Workingdays:any,name:any,description:any,work_to:any,work_from:any){
    var loginAPI = this.host + 'addWinchDriver';
      return new Promise<any>((resolve, reject) => {
        this.http.post<any>(loginAPI, JSON.stringify({}), {
          params: new HttpParams().set('token',token).append('role_id',role_id).append('workingdays',Workingdays)
            .append('email',email).append('password',password).append("description",description).append("work_to",work_to).append("name",name)
            .append("work_from",work_from).append("price_per_km",price_per_km)
        })
          .subscribe(res => {
            resolve(res);
          }, (err) => {
            reject(err);
          });
      });
  }

  EditWinchDriverForSpecificCompany(token:any,role_id:any,driver_id:any,price_per_km:any,availability:any){
    var loginAPI = this.host + 'updateWinchDriverData';
      return new Promise<any>((resolve, reject) => {
        this.http.post<any>(loginAPI, JSON.stringify({}), {
          params: new HttpParams().set('token',token).append('role_id',role_id).append('driver_id',driver_id)
            .append('price_per_km',price_per_km).append('availability',availability)
        })
          .subscribe(res => {
            resolve(res);
          }, (err) => {
            reject(err);
          });
      });
  }

  AddWinchCompany(token:any,Type:any,Workingdays:any,name:any,description:any,work_to:any,work_from:any,roleID:any,companyType:any){
    var loginAPI = this.host + 'userManageRole';
      return new Promise<any>((resolve, reject) => {
        this.http.post<any>(loginAPI, JSON.stringify({}), {
          params: new HttpParams().set('token',token).append('type',Type).append('workingdays',Workingdays)
            .append('name',name).append("description",description).append("work_to",work_to)
            .append("work_from",work_from).append("roleID",roleID).append("companyType",companyType)
        })
          .subscribe(res => {
            resolve(res);
          }, (err) => {
            reject(err);
          });
      });
  }

  AddWorkShop(token:any,Type:any,Workingdays:any,name:any,description:any,work_to:any,work_from:any,roleID:any,URL:any,Workshoptype:any){
    var loginAPI = this.host + 'userManageRole';
      return new Promise<any>((resolve, reject) => {
        this.http.post<any>(loginAPI, {"workshoptype":Workshoptype}, {
          params: new HttpParams().set('token',token).append('type',Type).append('workingdays',Workingdays)
            .append('name',name).append("description",description).append("work_to",work_to)
            .append("work_from",work_from).append("roleID",roleID).append("URL",URL)
        })
          .subscribe(res => {
            resolve(res);
          }, (err) => {
            reject(err);
          });
      });
  }

  AddSpareParts(token:any,Type:any,Workingdays:any,name:any,description:any,work_to:any,work_from:any,roleID:any,URL:any,SparePartsTypetype:any){
    var loginAPI = this.host + 'userManageRole';
      return new Promise<any>((resolve, reject) => {
        this.http.post<any>(loginAPI, JSON.stringify({}), {
          params: new HttpParams().set('token',token).append('type',Type).append('workingdays',Workingdays)
            .append('name',name).append("description",description).append("work_to",work_to)
            .append("work_from",work_from).append("roleID",roleID).append("URL",URL).append("spareshoptype",SparePartsTypetype)
        })
          .subscribe(res => {
            resolve(res);
          }, (err) => {
            reject(err);
          });
      });
  }

  CheckHasWinchDriver(token:any){
    var loginAPI = this.host + 'checkHasWinch';
      return new Promise<any>((resolve, reject) => {
        this.http.post<any>(loginAPI, JSON.stringify({}), {
          params: new HttpParams().set('token',token)
        })
          .subscribe(res => {
            resolve(res);
          }, (err) => {
            reject(err);
          });
      });
  }
  addNewPhone(token:any,roleID:any,phone:any,phoneID:any){

    var loginAPI = this.host + 'userManageRolePhone';
      return new Promise<any>((resolve, reject) => {
        this.http.post<any>(loginAPI, JSON.stringify({}), {
          params: new HttpParams().set('token',token).append("roleID",roleID).append("phone",phone).append("phoneID",phoneID)
        })
          .subscribe(res => {
            resolve(res);
          }, (err) => {
            reject(err);
          });
      });
  }
  editPhone(token:any,roleID:any,phone:any,phoneID:any){

    var loginAPI = this.host + 'userManageRolePhone';
      return new Promise<any>((resolve, reject) => {
        this.http.post<any>(loginAPI, JSON.stringify({}), {
          params: new HttpParams().set('token',token).append("roleID",roleID).append("phone",phone).append("phoneID",phoneID)
        })
          .subscribe(res => {
            resolve(res);
          }, (err) => {
            reject(err);
          });
      });
  }
  deletePhone(token:any,roleID:any,phoneID:any){

    var loginAPI = this.host + 'deleteRolePhone';
      return new Promise<any>((resolve, reject) => {
        this.http.post<any>(loginAPI, JSON.stringify({}), {
          params: new HttpParams().set('token',token).append("roleID",roleID).append("phoneID",phoneID)
        })
          .subscribe(res => {
            resolve(res);
          }, (err) => {
            reject(err);
          });
      });
  }
  changeLock(token:any,roleID:any){

    var loginAPI = this.host + 'changeLock';
      return new Promise<any>((resolve, reject) => {
        this.http.post<any>(loginAPI, JSON.stringify({}), {
          params: new HttpParams().set('token',token).append("roleID",roleID)
        })
          .subscribe(res => {
            resolve(res);
          }, (err) => {
            reject(err);
          });
      });
  }
  viewWorkShopTypes(token:any){
    var loginAPI = this.host + 'getWorkshopTypes';
      return new Promise<any>((resolve, reject) => {
        this.http.post<any>(loginAPI, JSON.stringify({}), {
          params: new HttpParams().set('token',token)
        })
          .subscribe(res => {
            resolve(res);
          }, (err) => {
            reject(err);
          });
      });
  }

  addImages(token:any,role_id:any,type:any,images:any){
    var loginAPI = this.host + 'addRolesImages';
      return new Promise<any>((resolve, reject) => {
        this.http.post<any>(loginAPI, { 'images':images}, {
          params: new HttpParams().set('token',token).append('role_id',role_id).append('type',type)
        })
          .subscribe(res => {
            resolve(res);
          }, (err) => {
            reject(err);
          });
      });
  }

  deleteImages(token:any,role_id:any,roleImg_ID:any){
    console.log(token + '-' +role_id + '-' +roleImg_ID)
    var loginAPI = this.host + 'deleteRolesImage';
      return new Promise<any>((resolve, reject) => {
        this.http.post<any>(loginAPI, {}, {
          params: new HttpParams().set('token',token).append('role_id',role_id).append('roleImg_ID',roleImg_ID)
        })
          .subscribe(res => {
            resolve(res);
          }, (err) => {
            reject(err);
          });
      });
  }

  addImagesForProduct(token:any,role_id:any,type:any,images:any,product_id:any){
    var loginAPI = this.host + 'addProductsImages';
      return new Promise<any>((resolve, reject) => {
        this.http.post<any>(loginAPI, { 'images':images}, {
          params: new HttpParams().set('token',token).append('role_id',role_id).append('type',type).append('product_id',product_id)
        })
          .subscribe(res => {
            resolve(res);
          }, (err) => {
            reject(err);
          });
      });
  }

  deleteImagesForProduct(token:any,role_id:any,productImg_id:any,product_id:any){
    var loginAPI = this.host + 'deleteProductsImage';
      return new Promise<any>((resolve, reject) => {
        this.http.post<any>(loginAPI, {}, {
          params: new HttpParams().set('token',token).append('role_id',role_id).append('productImg_id',productImg_id).append('product_id',product_id)
        })
          .subscribe(res => {
            resolve(res);
          }, (err) => {
            reject(err);
          });
      });
  }

  addLocation(token:any,role_id:any,location:any,lat:any,long:any,locationID:any){
    var loginAPI = this.host + 'userManageRoleLocation';
      return new Promise<any>((resolve, reject) => {
        this.http.post<any>(loginAPI, {}, {
          params: new HttpParams().set('token',token).append('role_id',role_id).append('location',location)
          .append('lat',lat).append('long',long).append('locationID',locationID)
        })
          .subscribe(res => {
            resolve(res);
          }, (err) => {
            reject(err);
          });
      });
  }

  editLocatio(token:any,role_id:any,location:any,lat:any,long:any,locationID:any){
    var loginAPI = this.host + 'userManageRoleLocation';
      return new Promise<any>((resolve, reject) => {
        this.http.post<any>(loginAPI, {}, {
          params: new HttpParams().set('token',token).append('role_id',role_id).append('location',location)
          .append('lat',lat).append('long',long).append('locationID',locationID)
        })
          .subscribe(res => {
            resolve(res);
          }, (err) => {
            reject(err);
          });
      });
  }

  deleteLocatio(token:any,role_id:any,locationID:any){
    var loginAPI = this.host + 'deleteRoleLocation';
      return new Promise<any>((resolve, reject) => {
        this.http.post<any>(loginAPI, {}, {
          params: new HttpParams().set('token',token).append('role_id',role_id).append('locationID',locationID)
        })
          .subscribe(res => {
            resolve(res);
          }, (err) => {
            reject(err);
          });
      });
  }

  addBranchesForWinchCompany(token:any,role_id:any,locationID:any){
    var loginAPI = this.host + 'deleteRoleLocation';
      return new Promise<any>((resolve, reject) => {
        this.http.post<any>(loginAPI, {}, {
          params: new HttpParams().set('token',token).append('role_id',role_id).append('locationID',locationID)
        })
          .subscribe(res => {
            resolve(res);
          }, (err) => {
            reject(err);
          });
      });
  }

  addProduct(token:any,brand:any,price:any,sparesshop_id:any,description:any,name:any){
    var loginAPI = this.host + 'addproduct';
      return new Promise<any>((resolve, reject) => {
        this.http.post<any>(loginAPI, {}, {
          params: new HttpParams().set('token',token).append('brand',brand).append('price',price)
          .append('sparesshop_id',sparesshop_id).append('description',description).append('name',name)
        })
          .subscribe(res => {
            resolve(res);
          }, (err) => {
            reject(err);
          });
      });
  }

  editProduct(token:any,brand:any,price:any,productID:any,description:any,name:any){
    var loginAPI = this.host + 'editproduct';
      return new Promise<any>((resolve, reject) => {
        this.http.post<any>(loginAPI, {}, {
          params: new HttpParams().set('token',token).append('brand',brand).append('price',price)
          .append('productID',productID).append('description',description).append('name',name)
        })
          .subscribe(res => {
            resolve(res);
          }, (err) => {
            reject(err);
          });
      });
  }
  deleteProduct(token:any,productID:any){
    var loginAPI = this.host + 'deleteproduct';
      return new Promise<any>((resolve, reject) => {
        this.http.post<any>(loginAPI, {}, {
          params: new HttpParams().set('token',token)
          .append('productID',productID)
        })
          .subscribe(res => {
            resolve(res);
          }, (err) => {
            reject(err);
          });
      });
  }

  getAllProduct(token:any,spareShopID:any){
    var loginAPI = this.host + 'GetSpareShopProdcut';
      return new Promise<any>((resolve, reject) => {
        this.http.post<any>(loginAPI, {}, {
          params: new HttpParams().set('token',token).append('spareShopID',spareShopID)
        })
          .subscribe(res => {
            resolve(res);
          }, (err) => {
            reject(err);
          });
      });
  }

  getFreeWinchDrivert(token:any,role_id:any){
    var loginAPI = this.host + 'getFreeDrivers';
      return new Promise<any>((resolve, reject) => {
        this.http.post<any>(loginAPI, {}, {
          params: new HttpParams().set('token',token).append('role_id',role_id)
        })
          .subscribe(res => {
            resolve(res);
          }, (err) => {
            reject(err);
          });
      });
  }

  assignWinchDrivert(token:any,role_id:any,driver_id:any){
    var loginAPI = this.host + 'assignWinchDriver';
      return new Promise<any>((resolve, reject) => {
        this.http.post<any>(loginAPI, {}, {
          params: new HttpParams().set('token',token).append('role_id',role_id).append('driver_id',driver_id)
        })
          .subscribe(res => {
            resolve(res);
          }, (err) => {
            reject(err);
          });
      });
  }
  cancelassignWinchDrivert(token:any,role_id:any,driver_id:any){
    var loginAPI = this.host + 'cancelAssignWinchDriver';
      return new Promise<any>((resolve, reject) => {
        this.http.post<any>(loginAPI, {}, {
          params: new HttpParams().set('token',token).append('role_id',role_id).append('driver_id',driver_id)
        })
          .subscribe(res => {
            resolve(res);
          }, (err) => {
            reject(err);
          });
      });
  }
  addComment(token:any,role_id:any,comment:any,comment_id:any){
    var loginAPI = this.host + 'addComment';
    return new Promise<any>((resolve, reject) => {
      this.http.post<any>(loginAPI, {}, {
        params: new HttpParams().set('token',token).append('role_id',role_id).append('comment',comment).append('comment_id',comment_id)
      })
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }
  editComment(token:any,comment:any,targetCommentID:any){
    var loginAPI = this.host + 'editComment';
    return new Promise<any>((resolve, reject) => {
      this.http.post<any>(loginAPI, {}, {
        params: new HttpParams().set('token',token).append('comment',comment).append('targetCommentID',targetCommentID)
      })
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }
  deleteComment(token:any,targetCommentID:any){
    var loginAPI = this.host + 'deleteComment';
    return new Promise<any>((resolve, reject) => {
      this.http.post<any>(loginAPI, {}, {
        params: new HttpParams().set('token',token).append('targetCommentID',targetCommentID)
      })
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }
  getComments(token:any,role_id:any){
    var loginAPI = this.host + 'getComments';
    return new Promise<any>((resolve, reject) => {
      this.http.post<any>(loginAPI, {}, {
        params: new HttpParams().set('token',token).append('role_id',role_id)
      })
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }
  addEstimateComment(token:any,role_id:any,estimate:any,comment_id:any){
    var loginAPI = this.host + 'addEstimateComment';
    return new Promise<any>((resolve, reject) => {
      this.http.post<any>(loginAPI, {}, {
        params: new HttpParams().set('token',token).append('role_id',role_id)
        .append('estimate',estimate).append('comment_id',comment_id)
      })
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }
  deleteEstimateComment(token:any,comment_id:any){
    var loginAPI = this.host + 'deleteEstimateComment';
    return new Promise<any>((resolve, reject) => {
      this.http.post<any>(loginAPI, {}, {
        params: new HttpParams().set('token',token).append('comment_id',comment_id)
      })
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  addBrach(token:any,role_id:any,phone:any,address:any,winchcompany_id:any,branchID:any){
    var loginAPI = this.host + 'providerManageCompanyBranches';
    return new Promise<any>((resolve, reject) => {
      this.http.post<any>(loginAPI, {}, {
        params: new HttpParams().set('token',token).append('role_id',role_id)
        .append('phone',phone)
        .append('address',address)
        .append('winchcompany_id',winchcompany_id)
        .append('branchID',branchID)
      })
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }
  deleteBrach(token:any,role_id:any,winchcompany_id:any,branchID:any){
    var loginAPI = this.host + 'deleteCompanyBranches';
    return new Promise<any>((resolve, reject) => {
      this.http.post<any>(loginAPI, {}, {
        params: new HttpParams().set('token',token).append('role_id',role_id)
        .append('winchcompany_id',winchcompany_id)
        .append('branchID',branchID)
      })
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  addOffer(token:any,startDate:any,endDate:any,description:any,title:any,role_id:any,img:any){
    var loginAPI = this.host + 'addOffer';
    return new Promise<any>((resolve, reject) => {
      this.http.post<any>(loginAPI, { 'img':img }, {
        params: new HttpParams().set('token',token).append('role_id',role_id)
        .append('startDate',startDate)
        .append('endDate',endDate)
        .append('description',description)
        .append('title',title)
      })
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }
  editOffer(token:any,startDate:any,endDate:any,description:any,title:any,role_id:any,img:any,offerID:any){
    var loginAPI = this.host + 'editOffer';
    return new Promise<any>((resolve, reject) => {
      this.http.post<any>(loginAPI, { 'img':img }, {
        params: new HttpParams().set('token',token).append('role_id',role_id)
        .append('startDate',startDate)
        .append('endDate',endDate)
        .append('description',description)
        .append('title',title)
        .append('offerID',offerID)
      })
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  deleteOffer(token:any,role_id:any,offerID:any){
    var loginAPI = this.host + 'deleteoffer';
    return new Promise<any>((resolve, reject) => {
      this.http.post<any>(loginAPI, {}, {
        params: new HttpParams().set('token',token).append('role_id',role_id)

        .append('offerID',offerID)
      })
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }
  getOrders(token:any,winchdriver_id:any){
    var loginAPI = this.host + 'WinchDriverOrders';
    return new Promise<any>((resolve, reject) => {
      this.http.post<any>(loginAPI, {}, {
        params: new HttpParams().set('token',token).append('winchdriver_id',winchdriver_id)
      })
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }
}
