import { Component } from '@angular/core';
import { IonicPage, ViewController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';

import { WebservicesProvider } from '../../providers/webservices/webservices';

@IonicPage()
@Component({
  selector: 'page-getTrip',
  templateUrl: 'getTrip.html',
})
export class GetTripPage {

  tripList: any[];
  chosenTrip: any;

  constructor(public viewCtrl: ViewController, public navParams: NavParams, private http: HttpClient, private storage: Storage, private REST: WebservicesProvider) {
    this.REST.getPotovanja(1).then(data => {
      this.tripList = data;
    });
  }

  //posljemo prazne podatke
  closeModal() {
    this.viewCtrl.dismiss(null);
  }

  //posljemo prazne podatke
  pickTrip() {
    this.viewCtrl.dismiss(this.chosenTrip);
  }

}
