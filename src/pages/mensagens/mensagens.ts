import { CommonProvider } from './../../providers/common/common';
import { MessageDetailsPage } from './../message-details/message-details';
import { MessageDataProvider } from './../../providers/message-data/message-data';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Config } from 'ionic-angular';
import { AuthServiceProvider } from './../../providers/auth-service/auth-service';
import { Storage } from '@ionic/storage';
import { NetworkConnectivityProvider } from '../../providers/network-connectivity/network-connectivity';
@IonicPage()
@Component({
  selector: 'page-mensagens',
  templateUrl: 'mensagens.html',
})
export class MensagensPage {
  notificacoes = [];
  conteudo: any;
  mensagens: any;
  isMd: boolean;
  constructor(
    public config: Config,
    public messageData: MessageDataProvider,
    public navCtrl: NavController,
    public navParams: NavParams,
    public authService: AuthServiceProvider,
    private storage: Storage,
    private common : CommonProvider,
    public network: NetworkConnectivityProvider
  ) {

  }


  ionViewDidLoad() {
    if (this.network.NetworkStatus.value != false){
      this.getMensagens();
      console.log("getAPIessages");
    }else{
      this.storage.get('pushs').then((val) => {
      
        this.mensagens = val;
          console.log("getstoragemessages");
       });
    }
    
    this.common.closeLoading();
  }
  ionViewWillEnter() {
   // this.conteudo = localStorage.getItem('push');
    
   
    
  }

  getMensagens() {
    this.common.presentLoading("carregando mensagens");
    this.authService.getDataPushs('getpushs', localStorage.getItem('token'), localStorage.getItem('codusuario'))
      .then((result) => {
       console.log("results"+JSON.stringify(result));
        this.storage.set('pushs', result);
        return result;

      });

  }


  contactTapped(event, message) {
    this.navCtrl.push(MessageDetailsPage, {
      message: message
    });
  }

}
