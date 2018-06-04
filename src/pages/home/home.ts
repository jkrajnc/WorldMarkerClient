import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { I18nDemoModule } from '../i18n-demo/i18n-demo.page';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

}
