import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { I18nDemoPage } from '../i18n-demo/i18n-demo.page';
import { MapPage } from '../map/map';
import { ViewActivityPage } from '../viewActivity/viewActivity';
import { GalleryPage } from '../gallery/gallery';


// Importanje service providanje
import { WebservicesProvider } from '../../providers/webservices/webservices';


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
  const data = this.webservices.getSlika();
    data.then(podatki => {
      console.log("podatki");
      console.log(podatki);      
    });

    // Klicanje post metode
    const NazviSlike = "Rrimer"
    const ImgData = "Primer2"
    this.webservices.postSlika(NazivSlike, ImgData);
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
