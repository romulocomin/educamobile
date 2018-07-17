import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CommonProvider } from '../../providers/common/common';

@IonicPage()
@Component({
  selector: 'page-academico',
  templateUrl: 'academico.html',
})
export class AcademicoPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public common: CommonProvider,) {
    
  }

  ionViewDidLoad(){
    console.log('ionViewDidLoad AcademicoPage');
    this.common.presentLoading('carregando');
    this.prepareFrame();
   
  }
  ionViewWillEnter() {
    
   this.checkIframeLoaded();
  }

  prepareFrame() {
     let codusuario = "?codusuario="+ localStorage.getItem("codusuario");
    let senha = "&senha="+localStorage.getItem("senha");
 
    var ifrm = document.createElement("iframe");
    ifrm.setAttribute("src", "http://104.200.20.128/seg/app/integracao.php"+codusuario+senha);
    ifrm.style.width = "100%";
    ifrm.style.height = "100%";
    ifrm.frameBorder="0";
    ifrm.id="iframe";
    document.getElementById("divframe").appendChild(ifrm);
    
  }

  checkIframeLoaded() {
    // Get a handle to the iframe element
    var iframe = document.getElementById('iframe');
    var iframeDoc = iframe.ownerDocument ;

    // Check if loading is complete
    if (  iframeDoc.readyState  == 'complete' ) {
        //iframe.contentWindow.alert("Hello");
        iframe.onload = function check(){
            //alert("I am loaded");
          var elements= document.getElementsByClassName("loading-md");
          while (elements.length > 0) elements[0].remove();
        };
        // The loading is complete, call the function we want executed once the iframe is loaded
        
        return;
    } 

    // If we are here, it is not loaded. Set things up so we check   the status again in 100 milliseconds
    window.setTimeout(this.checkIframeLoaded, 100);
}
closeif(){
  this.common.closeLoading();
}

}
