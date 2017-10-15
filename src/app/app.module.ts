import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

//plugins
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { AgmCoreModule } from '@agm/core';
import { Contacts} from '@ionic-native/contacts';
import { EmailComposer } from '@ionic-native/email-composer';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { TabsPage, GuardadosPage, MapaPage } from '../pages/index.paginas';
import { HistorialProvider } from '../providers/historial/historial';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TabsPage,
    GuardadosPage,
    MapaPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBOZ3mrvMJ7RrkyO6WEjVLjpNImzhSpiSA'
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TabsPage,
    GuardadosPage,
    MapaPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    BarcodeScanner,
    InAppBrowser,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    HistorialProvider,
    Contacts,
    EmailComposer
  ]
})
export class AppModule { }
