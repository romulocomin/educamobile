import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import 'rxjs/Rx';



let apiUrl = "http://104.200.20.128/seg/apiv2/api.php/";


@Injectable()

export class AuthServiceProvider {
  profileData = [];
  
  resposedata: any;

  constructor(
    public http: HttpClient
  
  ) {
   
   
  }
  

  postData(credentials, type){
   
    return new Promise((resolve, reject) =>{
     
      this.http.post(apiUrl+type, JSON.stringify(credentials))
      .subscribe((result: any) => {
        resolve(result);
        
        
      }, (err) =>{
        console.log("error"+ err.status)
        
        
      });

    });

  }


getData(type, token) {
    
    return new Promise((resolve, reject) => {
      let ntoken = '';
     
     ntoken = token.replace(/["]/g, "");
     
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'token': ntoken,
          'Access-Control-Allow-Origin' : '*',
          'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT'
        })
      };
 
      this.http.get(apiUrl+type,httpOptions)
        .subscribe((result: any) => {
          resolve(result);
          
        },
        (error) => {
          //reject(alert(JSON.stringify(error)));
        });
    });
  }
  

  getDataPushs(type, token, codusuario) {
    
    return new Promise((resolve, reject) => {
     
     let ntoken = token.replace(/["]/g, "");
     let cod = codusuario.replace(/["]/g, "");
     console.log('return call0'+ntoken+'---'+cod);
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'token': ntoken,
          'codusuario': cod,
          'Access-Control-Allow-Origin' : '*',
          'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT'
        })
      };
 
      this.http.get(apiUrl+type,httpOptions)
        .subscribe((result: any) => {
          resolve(result);
          console.log('return callresolve--'+JSON.stringify(result) );
        },
        (error) => {
          console.log('return call1 error'+JSON.stringify(error));
          //reject(alert(JSON.stringify(error)));
        });
    });
  }

}
