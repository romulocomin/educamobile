import { Storage } from '@ionic/storage';
import { CommonProvider } from './../../providers/common/common';
import { Md5 } from 'ts-md5/dist/md5';
import { AuthServiceProvider } from './../../providers/auth-service/auth-service';
import { HomePage,  } from './../home/home';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Usuario } from '../../models/usuario-model';
import { _iterableDiffersFactory } from '@angular/core/src/application_module';
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
  listboletos = { "token": "", "codcoligada": "", "codcfo": "", "tipousuario": "" };
  context: any;
  constructor(
    public common: CommonProvider,
    public navCtrl: NavController,
    public navParams: NavParams,
    public authService: AuthServiceProvider,
    private storage: Storage
   
  ) {

    this.boleto = "abertos";
   

  }
  ionViewWillEnter() {
    this.boleto = "abertos";
    this.getToday();
  
  }
  ionViewDidLoad() {
    
    this.storage.get('datacontexto').then((data)=>{
    this.context= JSON.parse(data);
   
  });

  }

  public onItemSelection(selection) {
    if (selection != undefined) {
      console.log("item selected: " + this.selected);
      this.listboletos.codcoligada=this.context[this.selected]['codcoligada'];
      this.listboletos.codcfo=this.context[this.selected]['codcfo'];
      this.listboletos.tipousuario=this.context[this.selected]['tipousuario'];
      this.listboletos.token=localStorage.getItem('token').replace(/["]/g, "");
      this.getBoletos( this.listboletos);

    } else {
      console.log("no item selected");
    }
  }

  getBoletos(listboletos) {
   
    this.common.presentLoading("Carregamndo informações...");
       
        this.authService.postData( listboletos ,"listaboletos" ).then((result) => {
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

}
