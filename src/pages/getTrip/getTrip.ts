import { Component } from '@angular/core';
import { IonicPage, ViewController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-getTrip',
  templateUrl: 'getTrip.html',
})
export class GetTripPage {

  //idMember: number;
  //reportREST: RestPorociloProvider = new RestPorociloProvider(this.http);
  tripList: any[];
  chosenTrip: any;

  constructor(public viewCtrl: ViewController, public navParams: NavParams, private http: HttpClient, private storage: Storage) {
    /*storage.get("session").then((value => {
      this.reportREST.getPorocilaByIdClan(value.id).subscribe(porocila => this.reportList = porocila);
   }));*/
  }

  //posljemo prazne podatke
  closeModal() {
    this.viewCtrl.dismiss(null);
  }

  //posljemo prazne podatke
  pickReport() {
    this.viewCtrl.dismiss(this.chosenTrip);
  }

}
