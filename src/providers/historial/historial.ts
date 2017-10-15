import { Injectable } from '@angular/core';
import { ScanData } from '../../models/scan-data.model';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { ModalController, Platform, ToastController } from 'ionic-angular';
import { MapaPage } from '../../pages/mapa/mapa';
import { Contacts, Contact, ContactField, ContactName } from '@ionic-native/contacts';
import { EmailComposer } from '@ionic-native/email-composer';
/*
  Generated class for the HistorialProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class HistorialProvider {

  private _historial: ScanData[] = [];

  constructor(private iab: InAppBrowser, private modalCtrl: ModalController, private contacts: Contacts,
    private platform: Platform, private toastCtrl: ToastController,
    private emailComposer: EmailComposer) { }

  cargarHistorial() {
    return this._historial
  }

  agregarHistorial(texto: string) {
    let data = new ScanData(texto);

    this._historial.unshift(data);

    console.log(this._historial);

    this.abrirScan(0); // Ya que la primera posicion es la que acabamos de usar

  }

  abrirScan(index: number) {
    let scanData = this._historial[index];
    console.log(scanData);

    switch (scanData.tipo) {

      case "http":
        this.iab.create(scanData.info, "_system");
        break

      case "mapa":
        this.modalCtrl.create(MapaPage, { coords: scanData.info }).present();

        break;

      case "contacto":
        this.crearContacto(scanData.info);
        break;

      case "mail":
        this.crearMail(scanData.info);
        break;

      default:
        console.log("Tipo no soportado")
    }
  }

  private crearContacto(texto: string) {
    let campos: any = this.parse_vcard(texto);
    console.log(campos);

    let nombre = campos['fn'];
    let tel = campos.tel[0].value[0];

    if (!this.platform.is('cordova')) {
      console.warn("Estoy en la computadora, no puedo crear contactos")
      return;
    }
    let contact: Contact = this.contacts.create();
    contact.name = new ContactName(null, nombre);
    contact.phoneNumbers = [new ContactField('mobile', tel)];

    contact.save().then(
      () => this.crearToast("Contacto" + nombre + "creado!"),
      (error: any) => this.crearToast("Error" + error)
    );
  }

  private crearToast(mensaje: string) {
    this.toastCtrl.create({
      message: mensaje,
      duration: 3000
    }).present();
  }

  private parse_vcard(input: string) {

    var Re1 = /^(version|fn|title|org):(.+)$/i;
    var Re2 = /^([^:;]+);([^:]+):(.+)$/;
    var ReKey = /item\d{1,2}\./;
    var fields = {};

    input.split(/\r\n|\r|\n/).forEach(function(line) {
      var results, key;

      if (Re1.test(line)) {
        results = line.match(Re1);
        key = results[1].toLowerCase();
        fields[key] = results[2];
      } else if (Re2.test(line)) {
        results = line.match(Re2);
        key = results[1].replace(ReKey, '').toLowerCase();

        var meta = {};
        results[2].split(';')
          .map(function(p, i) {
            var match = p.match(/([a-z]+)=(.*)/i);
            if (match) {
              return [match[1], match[2]];
            } else {
              return ["TYPE" + (i === 0 ? "" : i), p];
            }
          })
          .forEach(function(p) {
            meta[p[0]] = p[1];
          });

        if (!fields[key]) fields[key] = [];

        fields[key].push({
          meta: meta,
          value: results[3].split(';')
        })
      }
    });

    return fields;
  };

  private crearMail(texto: string) {
    let partesMail = texto.split(";")

    let to = partesMail[0].replace("MATMSG:TO:", "")
    let subject = partesMail[1].replace("SUB:", "")
    let body = partesMail[2].replace("BODY:", "")


    let email = {
      to: to,
      subject: subject,
      body: body,
      isHtml: true
    };
    console.log(email)
    this.emailComposer.open(email);
  }

}
