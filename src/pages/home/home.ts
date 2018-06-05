import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { I18nDemoPage } from '../i18n-demo/i18n-demo.page';
import { MapPage } from '../map/map';
import { ViewActivityPage } from '../viewActivity/viewActivity';

import { WebservicesProvider } from '../../providers/webservices/webservices';




@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  

  constructor(public navCtrl: NavController, public webservices: WebservicesProvider ) {

  }

  /*
  const data = this.webservices.getSlika();
    data.then(podatki => {
      console.log("podatki");
      console.log(podatki);      
    });

    this.webservices.postSlika("NazivSlik", "ImgData");
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



}
