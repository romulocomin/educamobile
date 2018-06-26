import { RelatoriosPage } from './../relatorios/relatorios';
import { MensagensPage } from './../mensagens/mensagens';
import { AcademicoPage } from './../academico/academico';
import { FinanceiroPage } from './../financeiro/financeiro';

import { AuthServiceProvider } from './../../providers/auth-service/auth-service';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  public avatar;
  academicoPage = AcademicoPage;
  financeiroPage = FinanceiroPage;
  mensagensPage = MensagensPage;   
  relatoriosPage = RelatoriosPage;

  profileData: any;
  contexto: any;
  resposeData: any;


  constructor(public navCtrl: NavController, navParams: NavParams, public authService: AuthServiceProvider
  ) {
   // this.avatar = navParams.get('eu');
   // this.profileData = navParams.get('data');

  }
  ionViewWillEnter() {
    
  }
  ionViewDidLoad() {
    
    this.getContexto();
    this.setName();

  }

  getContexto() {

    this.authService.getData("contexto", localStorage.getItem('token')).then((result) => {
      this.contexto = result;

     console.log("contexto"+this.contexto);
     
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
    //Api Token Logout 
    
    localStorage.clear();
    
     setTimeout(()=> this.backToWelcome(), 1000);
    
  }
  
}

