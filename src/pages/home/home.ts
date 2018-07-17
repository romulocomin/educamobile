import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NavController } from 'ionic-angular';
import { Usuario } from '../../models/usuario-model';
import { LoginPage } from '../login/login';
import { AuthServiceProvider } from './../../providers/auth-service/auth-service';
import { SessionProvider } from './../../providers/session/session';
import { AcademicoPage } from './../academico/academico';
import { FinanceiroPage } from './../financeiro/financeiro';
import { MensagensPage } from './../mensagens/mensagens';
import { RelatoriosPage } from './../relatorios/relatorios';
import { CommonProvider } from '../../providers/common/common';




@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  data(arg0: any): any {
    throw new Error("Method not implemented.");
  }
  public avatar;
  perfildata =[];

  academicoPage = AcademicoPage;
  financeiroPage = FinanceiroPage;
  mensagensPage = MensagensPage;   
  relatoriosPage = RelatoriosPage;

  profileData: any;
  contexto: any;
  resposeData: any;
   
  cont: any;

  constructor(
    public navCtrl: NavController, 
    public authService: AuthServiceProvider,
    public session: SessionProvider,
    private storage: Storage,
    private common: CommonProvider
    
    
  ) {
  
  }
  ionViewWillEnter() {

    
  }
  ionViewDidLoad() {
    
    this.getContext();
    this.common.closeLoading();
    this.setName();
    
  }

  getContext() {
  this.common.presentLoading("Carregando dados do usuário");
    this.authService.getData("contexto", localStorage.getItem('token')).then((data) => {
      this.contexto =  JSON.stringify(data);
      console.log("datacontexto"+this.contexto);
      this.storage.set('datacontexto',this.contexto);
    });
  }


 setName(){
  
  var element = document.getElementById("nameProfile");
  element.innerHTML = this.removec( localStorage.getItem('nome') );
 }

  removec(value: string)
  {  
    return value.replace(/["]/g, "");
  }
  backToWelcome(){
    this.navCtrl.setRoot(LoginPage);
   }
  
  logout(){

    localStorage.clear();
    
     setTimeout(()=> this.backToWelcome(), 1000);
    
  }
  
}

