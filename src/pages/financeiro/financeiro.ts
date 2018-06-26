import { CommonProvider } from './../../providers/common/common';
import { Md5 } from 'ts-md5/dist/md5';
import { AuthServiceProvider } from './../../providers/auth-service/auth-service';
import { HomePage,  } from './../home/home';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-financeiro',
  templateUrl: 'financeiro.html',
})
export class FinanceiroPage {


  public itens: Array<any>;
  selected = null;

  boleto: string = "abertos";
  today: any;
  boletos: any;
  
  recboletos = { "token": "", "codcoligada": "", "idboleto": "", "controle": "" };
  constructor(
    public common: CommonProvider,
    public navCtrl: NavController,
    public navParams: NavParams,
    public authService: AuthServiceProvider
    
  ) {

    this.boleto = "abertos";


  }
  ionViewWillEnter() {
    this.boleto = "abertos";
    this.getToday();
    this.getBoletos();
  }
  ionViewDidLoad() {
    console.log("fcont"+localStorage.getItem('contexto'));
   
    
  }

  getBoletos() {
    this.common.presentLoading("Carregamndo informações...");
    this.authService.getData("listaboletos", localStorage.getItem('token')).then((result) => {
      this.boletos = result;
      this.common.closeLoading();
    });

  }

  getToday() {
    this.today = new Date().toISOString();
  }

  getImpBoleto(codcol: any, idboleto: any) {


    this.recboletos.codcoligada = codcol;
    this.recboletos.idboleto = idboleto;
    this.recboletos.token = localStorage.getItem('token').replace(/["]/g, "");
    this.recboletos.controle = <any>Md5.hashStr('@SEG147' + codcol + idboleto);

    this.common.presentLoading("Gerando Boleto..");


    this.authService.postData(this.recboletos, "boletoimpressao").then((result) => {
    let cbol = JSON.stringify(result);
  
      window.open('http://104.200.20.128/seg/apiv2/'+cbol.replace(/[\\"]/g, ''), '_blank', 'location=yes');
      this.common.closeLoading();
      
      
    });

  }

  goBack(): void {
    this.navCtrl.setRoot(HomePage);
  }


  public onItemSelection(selection) {
    if (selection != undefined) {
      console.log("item selected: " + this.selected);

    } else {
      console.log("no item selected");
    }
  }






}
