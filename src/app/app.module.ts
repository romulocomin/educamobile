import { MessageDetailsPage } from './../pages/message-details/message-details';
import { OneSignal } from '@ionic-native/onesignal';
import { ListPage } from './../pages/list/list';
import { MensagensPage } from './../pages/mensagens/mensagens';
import { RelatoriosPage } from './../pages/relatorios/relatorios';
import { AcademicoPage } from './../pages/academico/academico';
import { CommonProvider } from './../providers/common/common';

import { LoginPage } from './../pages/login/login';
import { FinanceiroPage } from './../pages/financeiro/financeiro';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { HomePage } from '../pages/home/home';
import { MyApp } from './app.component';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { HttpClientModule } from '@angular/common/http';
import { OnesignalProvider } from '../providers/onesignal/onesignal';

import { MessageDataProvider } from '../providers/message-data/message-data';
import { Network } from '@ionic-native/network';
import { IonicStorageModule } from '@ionic/storage';
import { NetworkConnectivityProvider } from '../providers/network-connectivity/network-connectivity';
import { SessionProvider } from '../providers/session/session';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    AcademicoPage,
    FinanceiroPage,
    LoginPage,
    MensagensPage,
    MessageDetailsPage,
    RelatoriosPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    
    IonicStorageModule.forRoot({
      name: '__mydb',
         driverOrder: ['indexeddb', 'sqlite', 'websql']
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    AcademicoPage,
    FinanceiroPage,
    LoginPage,
    MensagensPage,
    MessageDetailsPage,
    RelatoriosPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthServiceProvider, CommonProvider, OneSignal,
    OnesignalProvider, MessageDataProvider, Network,
    NetworkConnectivityProvider,
    SessionProvider
     
  ]
})
export class AppModule {}
