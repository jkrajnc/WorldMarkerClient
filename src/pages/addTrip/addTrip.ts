import { Component } from '@angular/core';
import { IonicPage, ViewController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-addTrip',
  templateUrl: 'addTrip.html',
})
export class AddTripPage {

  private tripData: FormGroup;
  private defaultDate: string;

  constructor(private viewCtrl: ViewController, private formBuilder: FormBuilder) {
    //ustvarimo form
    this.tripData = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      date: ['', Validators.required],
      markerData: []
    });
    //default podatki, ki se prikazejo na formu ob odprtju
    this.defaultDate = new Date().toISOString();
  }

  //posljemo podatke forma
  sendTrip() {
    this.viewCtrl.dismiss(this.tripData);
  }

  //posljemo prazne podatke
  closeModal() {
    this.viewCtrl.dismiss(null);
  }

}
