import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GasStationService {

  private host:string = 'http://www.drivixcorp.com/api/';
  constructor(public http: HttpClient) { }

  showGasStation(city:any,filter:any){
    var loginAPI = this.host + 'getGasStationInCityApi';
      return new Promise<any>((resolve, reject) => {
        this.http.get<any>(loginAPI,{
          params: new HttpParams().set('city',city).append('filter',filter)
        })
          .subscribe(res => {
            resolve(res);
          }, (err) => {
            reject(err);
          });
      });
  }
  getGasStationReview(token:any,gas_id:any,rate:any){
    var loginAPI = this.host + 'gasStationReview';
      return new Promise<any>((resolve, reject) => {
        this.http.post<any>(loginAPI,{},{
          params: new HttpParams().set('token',token).append('gas_id',gas_id).append('rate',rate)
        })
          .subscribe(res => {
            resolve(res);
          }, (err) => {
            reject(err);
          });
      });
  }

  userMakeReviewOrNot(token:any,gas_id:any){
    var loginAPI = this.host + 'getUserReview';
      return new Promise<any>((resolve, reject) => {
        this.http.get<any>(loginAPI,{
          params: new HttpParams().set('token',token).append('gas_id',gas_id)
        })
          .subscribe(res => {
            resolve(res);
          }, (err) => {
            reject(err);
          });
      });
  }
}
