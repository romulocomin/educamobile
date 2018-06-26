import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-message-details',
  templateUrl: 'message-details.html',
})
export class MessageDetailsPage {
message:any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.message = navParams.get('message');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MessageDetailsPage');
  }

}
