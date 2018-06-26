import { OnesignalProvider } from './../providers/onesignal/onesignal';
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AcademicoPage } from './../pages/academico/academico';
import { FinanceiroPage } from './../pages/financeiro/financeiro';
import { HomePage } from '../pages/home/home';
import { LoginPage } from './../pages/login/login';
import { MensagensPage } from './../pages/mensagens/mensagens';
import { RelatoriosPage } from './../pages/relatorios/relatorios';
import { NetworkConnectivityProvider } from '../providers/network-connectivity/network-connectivity';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any = LoginPage;
  
  profileData = { 'nome': '' };
  pages: Array<{ title: string, component: any }>;
  status = '';
  constructor(
    
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public pushs: OnesignalProvider,
    public network : NetworkConnectivityProvider
  
    ) {

    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'Academico', component: AcademicoPage },
      { title: 'Financeiro', component: FinanceiroPage },
      { title: 'Mensagens', component: MensagensPage },
      { title: 'Relatórios', component: RelatoriosPage }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.pushs.pushsOnesignal();
      this.netWorkStatus();

    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.push(page.component);
  }

  netWorkStatus(){

    if(this.network.NetworkStatus.value==false){
      this.status = "offiline";
    }else{
      this.status="Online";
    };
  
    document.getElementById('bb').innerHTML=this.status;
  }
}
