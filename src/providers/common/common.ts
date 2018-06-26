import { Injectable } from '@angular/core';
import { LoadingController } from 'ionic-angular';

@Injectable()
export class CommonProvider {
  
  public loader: any;

  constructor(public loadingCtrl: LoadingController) {
    console.log('Hello CommonProvider Provider');
  }
  presentLoading(txt){
    this.loader = this.loadingCtrl.create({content: txt})
   this.loader.present();
   }
 
   closeLoading(){
   this.loader.dismiss();
   }
}
