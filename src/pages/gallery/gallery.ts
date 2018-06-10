import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { I18nDemoPage } from '../i18n-demo/i18n-demo.page';
import { MapPage } from '../map/map';
import { ViewActivityPage } from '../viewActivity/viewActivity';
import { HomePage } from '../home/home';

import { WebservicesProvider } from '../../providers/webservices/webservices';
import { AddActivityPage } from '../addActivity/addActivity';


/**
 * Generated class for the GalleryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-gallery',
  templateUrl: 'gallery.html',
})
export class GalleryPage {

  items: Array <any> = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public webservices: WebservicesProvider) {
  }

  ionViewDidLoad() {
    //console.log("dela");
    this.items = [];
    const podatki = this.webservices.getVseSlike();
    podatki.then(data => {
      if (data == null) {
      } else {
        console.log("dela2");
        console.log(data);
        console.log(data.length);
        var i = 0;
        while (i < data.length) {
          console.log("dela3");
          console.log(data[i]);
          this.items.push(data[i])
          i++;
        }
      }
    });
  }

  maptab(){
		this.navCtrl.push(MapPage);
  }

  hometab(){
		this.navCtrl.push(HomePage);
    }
    viewActivitytab(){
      this.navCtrl.push(ViewActivityPage);
    }

    settingstab(){
      this.navCtrl.push(I18nDemoPage);
    }

    showOnMap(slika){
      this.navCtrl.push(MapPage, slika);
    }
    addNewSlika(){
      this.navCtrl.push(AddActivityPage);
    }
}
