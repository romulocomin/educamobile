import { MessageDetailsPage } from './../message-details/message-details';
import { MessageDataProvider } from './../../providers/message-data/message-data';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Config } from 'ionic-angular';
import { AuthServiceProvider } from './../../providers/auth-service/auth-service';
import { Storage } from '@ionic/storage';
@IonicPage()
@Component({
  selector: 'page-mensagens',
  templateUrl: 'mensagens.html',
})
export class MensagensPage {
  notificacoes =[];
  conteudo:any;
  mensagens:any;
  isMd: boolean;
  constructor(
    public config: Config,
    public messageData: MessageDataProvider,
    public navCtrl: NavController, 
    public navParams: NavParams,
    public authService: AuthServiceProvider,
    private storage: Storage ){
 
  }
  

  ionViewDidLoad() {

   this.getMensagens();
  
  }
  ionViewWillEnter(){
    this.conteudo=localStorage.getItem('notificacoes');
     this.storage.get('pushs').then((val) => {
      this.mensagens = val;
      console.log('push is', this.mensagens);
    });
  }

getMensagens(){
  console.log('return call');
  this.authService.getDataPushs('getpushs',localStorage.getItem('token'), localStorage.getItem('codusuario')) 
  .then( (result)=>{
    
 this.storage.set('pushs', result);

 console.log('return'+result);
  });

}

  
  contactTapped(event, message) {
    this.navCtrl.push(MessageDetailsPage, {
      message: message
    });
  }

}
