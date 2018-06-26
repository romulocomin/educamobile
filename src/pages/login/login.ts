import { NetworkConnectivityProvider } from './../../providers/network-connectivity/network-connectivity';
import { CommonProvider } from './../../providers/common/common';
import { HomePage } from './../home/home';
import { AuthServiceProvider } from './../../providers/auth-service/auth-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  resposeData: any;

  userData = { "codusuario": "", "senha": "", "idonesignal": "" };
  status = '';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public authService: AuthServiceProvider,
    private toastCtrl: ToastController,
    public common: CommonProvider,
    public network: NetworkConnectivityProvider

  ) {
  }

  ionViewDidLoad() {


  }
  ionViewDidEnter() {
    this.netWorkStatus();
  }
  logina() {
    if (this.network.NetworkStatus.value != false) {

      this.common.presentLoading("Validando usuário..");

      if (this.userData.codusuario && this.userData.senha) {
        this.userData.idonesignal = localStorage.getItem("idmobile");
        this.authService.postData(this.userData, "login").then((result) => {
         this.resposeData = result;

          if (this.resposeData != 2) {
            this.resposeData = JSON.stringify(result[0]['token']);

            localStorage.setItem('nome', JSON.stringify(result[0]['nome']));
            localStorage.setItem('token', this.resposeData);
            localStorage.setItem('codusuario', this.userData.codusuario);

            this.common.closeLoading();
            this.navCtrl.push(HomePage);


          }
          else {
            this.common.closeLoading();
            this.presentToast("usuario ou senha invalidos");
          }

        }, (err) => {
          this.presentToast(err)
        });
      }
      else {
        this.common.closeLoading();
        this.presentToast("Informe usuário e senha");
      }
    }else{
      this.userData.codusuario=localStorage.getItem('codusuario');
      this.userData.senha=localStorage.getItem('senha');
      alert("dadosoff"+ this.userData.codusuario+ this.userData.senha);
    }
  }
  netWorkStatus(){

    if(this.network.NetworkStatus.value==false){
      this.status = "offiline";
    }else{
      this.status="Online";
    };
  
    document.getElementById('bb').innerHTML=this.status;
  }
  wait(ms) {
    var start = new Date().getTime();
    var end = start;
    while (end < start + ms) {
      end = new Date().getTime();
    }
  }
  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

}
