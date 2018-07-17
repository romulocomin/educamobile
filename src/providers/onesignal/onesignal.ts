
import { Injectable } from '@angular/core';
import { OneSignal } from '@ionic-native/onesignal';
import { AuthServiceProvider } from './../../providers/auth-service/auth-service';
@Injectable()
export class OnesignalProvider {

  dataPush = { "codusuario": "","token":"" ,"titulo":"", "msg": "", "lida": "", "enviada":"S" }
  pushsave: boolean;
  resposeData: string;
  constructor(
    public oneSignal: OneSignal,
    public authService: AuthServiceProvider

  ) {
    console.log('Hello OnesignalProvider Provider');
  }

  pushsOnesignal() {
    this.oneSignal.startInit('b9fc29bd-452f-45bc-856e-d9817203688d', '442777632598');
    this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);

    this.oneSignal.handleNotificationReceived().subscribe((msg) => {
     

      this.dataPush.codusuario = localStorage.getItem('codusuario');
      this.dataPush.titulo = msg.payload.title;
      this.dataPush.token = localStorage.getItem('token').replace(/["]/g, "");
      this.dataPush.msg = msg.payload.body.replace(/["]/g, "");
      this.dataPush.lida = "N";

      console.log("push"+msg.payload);

      this.authService.postData(this.dataPush, "savepush").then((result) => {
        this.resposeData = JSON.stringify(result);
        console.log("returnpushsaved" + this.resposeData);
      });

      if (localStorage.getItem('idmobile') == "") {
        this.oneSignal.getIds().then((id) => {

          localStorage.setItem('idmobile', id.userId);


        });
      }


    });

    this.oneSignal.handleNotificationOpened().subscribe((msg) => {
      this.dataPush.codusuario = localStorage.getItem('codusuario');
      //this.dataPush.msg=msg;
      this.dataPush.lida = "S";

      this.authService.postData(this.dataPush, "savepush").then((result) => {
        this.resposeData = JSON.stringify(result);
        console.log("returnpushsaved" + this.resposeData);
      });
    });
    this.oneSignal.endInit();
    this.oneSignal.getIds().then((id) => {
      console.log("getEnd" + id.userId);
      localStorage.setItem('idmobile', id.userId);

    });

  }
}
