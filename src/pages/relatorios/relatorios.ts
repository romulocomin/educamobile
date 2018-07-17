import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CommonProvider } from '../../providers/common/common';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { Storage } from '@ionic/storage';
@IonicPage()
@Component({
  selector: 'page-relatorios',
  templateUrl: 'relatorios.html',
})
export class RelatoriosPage {
  requirelatorios= {'codcoligada':'', 'idhabilitacaooficial':'', 'idperlet':'','ra':''};
  relatorios:any;
  dados ={'contexto':''};
  constructor(
    public navCtrl: NavController,
     public navParams: NavParams,
     public common: CommonProvider,
     public authService: AuthServiceProvider,
     public storage : Storage
    ) {
  }

  
  ionViewDidLoad() {
    this.getRelatorios();
  }


  getRelatorios() {
    this.storage.get('datacontexto').then((data) => {
      let context = JSON.parse(data);

      this.requirelatorios.codcoligada = context[0]['codcoligada'];
      this.requirelatorios.idhabilitacaooficial= context[0]['idhabilitacaooficial'];
      this.requirelatorios.idperlet = context[0]['idperlet'];
      this.requirelatorios.ra = context[0]['ra'];
      this.dados.contexto = context[0]['codcoligada']+'|'+context[0]['idhabilitacaooficial']+'|'+context[0]['idperlet']+
      '|'+context[0]['ra'];

      this.common.presentLoading("Carregamndo informações...");
        this.authService.postData("", "relatoriosalunosapp/"+ this.dados.contexto).then((result) => {
          this.relatorios = result;
      this.common.closeLoading();
        });
    });
  }
  getImpRelatorio(url: any) {

    this.common.presentLoading("Gerando Boleto..");


    this.authService.getData(url.replace("%7C", '|'), "").then((result) => {
    let cbol = JSON.stringify(result);
 
      window.open('http://104.200.20.128/seg/apiv2/'+cbol.replace(/[\\"]/g, ''), '_blank', 'location=yes');
      this.common.closeLoading();
      
      
    });

  }

}
