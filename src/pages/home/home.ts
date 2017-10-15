import { Component } from '@angular/core';
import { NavController, ToastController, Platform  } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import {HistorialProvider} from '../../providers/historial/historial';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, private barcodeScanner: BarcodeScanner,
    public toastCtrl: ToastController,
    private platform: Platform,
    private _historialService:HistorialProvider) {

  }

  scan() {
    console.log("Realizando scan")

    if( !this.platform.is('cordova')){
      // this._historialService.agregarHistorial("http://google.es")
      // this._historialService.agregarHistorial("geo:9.976133040865312,-84.00677479055173")
//       this._historialService.agregarHistorial( `BEGIN:VCARD
// VERSION:2.1
// N:Kent;Clark
// FN:Clark Kent
// ORG:
// TEL;HOME;VOICE:12345
// TEL;TYPE=cell:67890
// ADR;TYPE=work:;;;
// EMAIL:clark@superman.com
// END:VCARD` );
  this._historialService.agregarHistorial("MATMSG:TO:prueba@probando.com;SUB:Prueb;BODY:Este es un mail de prueba;;")

      return;
    }

    this.barcodeScanner.scan().then((barcodeData) => {
      // Success! Barcode data is here
      console.log(JSON.stringify( barcodeData))

      if ( barcodeData.cancelled == false && barcodeData.text != null){
        this._historialService.agregarHistorial(barcodeData.text)
      }

    }, (err) => {
      // An error occurred
      console.error("Error: ", err);
      this.mostrarError("Error: " +err);

    });
  }

  mostrarError(mensaje:string) {
  let toast = this.toastCtrl.create({
    message: mensaje,
    duration: 3000
  });
  toast.present();
}

}
