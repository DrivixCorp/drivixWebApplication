import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private host:string = 'http://www.drivixcorp.com/api/';

  constructor(public http: HttpClient) { }

  saveOrUpdateProfileData(phone:any,dateOfBirth:any,job:any,gender:any,token:any,S_or_U:number) : Promise<any>{
    if(S_or_U == 1) {
      var loginAPI = this.host + 'addprofile';
      return new Promise<any>((resolve, reject) => {
        this.http.post<any>(loginAPI, JSON.stringify({}), {
          params: new HttpParams().set('phone',phone).append('gender',gender).append('DOB',dateOfBirth)
            .append('location',"1.2558").append("job",job).append('token',token)
        })
          .subscribe(res => {
            resolve(res);
          }, (err) => {
            reject(err);
          });
      });
    }
    else if(S_or_U == 2){
      var loginAPI = this.host + 'updateprofile/'+token;
      return new Promise<any>((resolve, reject) => {
        this.http.post<any>(loginAPI, JSON.stringify({}), {
          params: new HttpParams().set('phone',phone).append('gender',gender).append('DOB',dateOfBirth)
            .append('location',"1.2558").append("job",job)
        })
          .subscribe(res => {
            resolve(res);
          }, (err) => {
            reject(err);
          });
      });
    }
    
  }
  

  showProfile(token:any) : Promise<any>{
   // console.log(token);
    var loginAPI = this.host + 'profile/'+ token;
    return new Promise<any>((resolve, reject) => {
      this.http.post<any>(loginAPI, JSON.stringify({})
      )
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  DeleteProfile(token:any){
    var loginAPI = this.host + 'deleteprofile';
    return new Promise<any>((resolve,reject)=>{
      this.http.post<any>(loginAPI, JSON.stringify({}), {
        params: new HttpParams().set('token',token)
      })
      .subscribe(res =>{
        resolve(res);
      },err =>{
        reject(err);
      });
    });
  }

  saveOrUpdateImage(token:any ,image:any){
    var loginAPI = this.host + 'setImage?token='+token;
      return new Promise<any>((resolve, reject) => {
        this.http.post<any>(loginAPI, {'image':image}, {
        })
          .subscribe(res => {
            resolve(res);
          }, (err) => {
            reject(err);
          });
      });
  }

  DeleteImage(token:any){
    var loginAPI = this.host + 'deleteimage?token='+token;
      return new Promise<any>((resolve, reject) => {
        this.http.post<any>(loginAPI, JSON.stringify({}), {
        })
          .subscribe(res => {
            resolve(res);
          }, (err) => {
            reject(err);
          });
      });
  }
}
