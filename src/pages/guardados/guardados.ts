import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';

import {HistorialProvider} from '../../providers/historial/historial';
import {ScanData} from '../../models/scan-data.model';

@Component({
  selector: 'page-guardados',
  templateUrl: 'guardados.html',
})
export class GuardadosPage {

  historial:ScanData[]= [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private _historialService:HistorialProvider) {

  }

  ionViewDidLoad() {

    this.historial = this._historialService.cargarHistorial();
  }

  abrirScan(index:number){
    this._historialService.abrirScan( index);
  }

}
