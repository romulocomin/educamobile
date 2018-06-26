import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
@Injectable()
export class MessageDataProvider {
  data: any;
  hasRequestPending: boolean = false;
  constructor(public http: HttpClient) {
    console.log('Hello MessageDataProvider Provider');
  }
  load() {
    let url = 'http://104.200.20.128/seg/apiv2/api.php/getpushs';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'token': '104011',
        'codusuario': '104011',
        'Access-Control-Allow-Origin' : '*',
        'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT'
      })
    };
    if (this.data) {
      // already loaded data
      return Promise.resolve(this.data);
    }

    // don't have the data yet
    return new Promise(resolve => {
      // We're using Angular Http provider to request the data,
      // then on the response it'll map the JSON data to a parsed JS object.
      // Next we process the data and resolve the promise with the new data.
      this.hasRequestPending = true;

      this.http
        .get(url,httpOptions)
        .map(
          (res:any) => {
            // If the request fails, throw an Error that will be caught
            if (res.status !== 200) {
              throw new Error('A resuisição falhou ' + res.status);
            // If everything went fine, return the response
            } else {
              console.log('aa'+JSON.stringify(res));
              return res;
            }
          }

        )
        .subscribe(
          data => {
            this.updateData(data);
            resolve(data);
            console.log('subs'+JSON.stringify(data));
          }, err => this.logError(err));
    });
  }

  updateData(data: any) {
    // console.log('Setting new data', data);
    this.data = data;
  }

  logError(error: any) {
    // console.log('Oh no, error', error);
  }


}
