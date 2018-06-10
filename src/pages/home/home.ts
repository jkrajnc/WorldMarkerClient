import { Component, ViewChild } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { I18nDemoPage } from '../i18n-demo/i18n-demo.page';
import { MapPage } from '../map/map';
import { ViewActivityPage } from '../viewActivity/viewActivity';
import { GalleryPage } from '../gallery/gallery';

// Importanje service providanje
import { WebservicesProvider } from '../../providers/webservices/webservices';

@IonicPage({
  name: 'home'
})

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  
                                              // Dodajanje atributa v konstruktor
  constructor(public navCtrl: NavController, public webservices: WebservicesProvider ) {

  }


  /*
  Klicanje get metode in pridobivanje podatkov iz promisa
  const data = this.webservices.getPotovanja(1);
    data.then(podatki => {
      //console.log("podatki");
      //console.log(podatki);      
    });

    // Klicanje post metode
    const naziv = "Rrimer"
    const opis = "Primer2"
    const datum = "2018-06-10"
    var text = '[ { "nazivAktivnosti": "Aktivnost13", "opisAktivnosti": "OpisAktivnosti", "tipAktivnosti": "TipAktivnosti", "datumAktivnosti": "2018-06-10", "latitude": "421412", "longitude": "24142121", "nazivSlike": "Slika1", "ImgData": "dasdasdsad" }, { "nazivAktivnosti": "Aktivnost13", "opisAktivnosti": "OpisAktivnosti", "tipAktivnosti": "TipAktivnosti", "datumAktivnosti": "2018-06-10", "latitude": "421412", "longitude": "24142121", "nazivSlike": "Slika1", "ImgData": "dasdasdsad" } ]';
      
    //console.log(myJSON)
    var obj1 = JSON.parse(text);
    this.webservices.postPotovanja(naziv, opis, datum, obj1);
  */



  
  maptab(){
    this.navCtrl.push(MapPage);
  }
  
  settingstab(){
		this.navCtrl.push(I18nDemoPage);
  }
  
  viewActivitytab(){
		this.navCtrl.push(ViewActivityPage);
  }

  viewGallery(){
		this.navCtrl.push(GalleryPage);
  }



}
