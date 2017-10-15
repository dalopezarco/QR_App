import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';


@Component({
  selector: 'page-mapa',
  templateUrl: 'mapa.html',
})
export class MapaPage {
  lat: number;
  lng: number;

  constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl: ViewController) {
    //
    // this.lat = 40.4167754;
    // this.lng = -3.7037901999999576;

    let coordsArray = this.navParams.get("coords").split(",")

    this.lat = Number(coordsArray[0].replace("geo:", ""));
    this.lng = Number(coordsArray[1]);

    console.log(this.lat, this.lng)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MapaPage');
  }

  cerrarModal(){
    this.viewCtrl.dismiss()
  }

}
