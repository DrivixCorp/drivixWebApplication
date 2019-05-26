import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class CarServiceService {
  private host:string = 'http://www.drivixcorp.com/api/';
  constructor(public http: HttpClient) { }

  addNewCar(token:any,year:any,color:any,model:any,brand:any){
    var loginAPI = this.host + 'storecar';
      return new Promise<any>((resolve, reject) => {
        this.http.post<any>(loginAPI, JSON.stringify({}), {
          params: new HttpParams().set('token',token).append('year',year).append('color',color)
          .append('model',model).append('brand',brand)
        })
          .subscribe(res => {
            resolve(res);
          }, (err) => {
            reject(err);
          });
      });
  }
  editCar(token:any,year:any,color:any,model:any,brand:any,carID:any){
    var loginAPI = this.host + 'updatecar';
      return new Promise<any>((resolve, reject) => {
        this.http.post<any>(loginAPI, JSON.stringify({}), {
          params: new HttpParams().set('token',token).append('year',year).append('color',color)
          .append('model',model).append('brand',brand).append('carID',carID)
        })
          .subscribe(res => {
            resolve(res);
          }, (err) => {
            reject(err);
          });
      });
  }

  GetAllCarOfUser(token:any){
    var loginAPI = this.host + 'getUserCar';
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

  deleteCar(token:any,carID:any){
    var loginAPI = this.host + 'deletecar';
      return new Promise<any>((resolve, reject) => {
        this.http.post<any>(loginAPI, JSON.stringify({}), {
          params: new HttpParams().set('token',token).append('carID',carID)
        })
          .subscribe(res => {
            resolve(res);
          }, (err) => {
            reject(err);
          });
      });
  }
}
