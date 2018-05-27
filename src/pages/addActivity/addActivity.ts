import { Component } from '@angular/core';
import { IonicPage, ViewController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Camera } from '@ionic-native/camera';

@IonicPage()
@Component({
  selector: 'page-addActivity',
  templateUrl: 'addActivity.html',
})
export class AddActivityPage {

  private activityData: FormGroup;
  private base64Image: string;
  private defaultDate: string;
  private defaultType: string;

  constructor(private viewCtrl: ViewController, private formBuilder: FormBuilder, private camera: Camera) {
    //ustvarimo form
    this.activityData = this.formBuilder.group({
      title: [null, Validators.required],
      type: [null, Validators.required],
      date: [null, Validators.required],
      description: [null],
      image: [null],
      latitude: [null],
      longitude: [null],
      gameType: [null],
      gameCategory: [null]
    });
    //default podatki, ki se prikazejo na formu ob odprtju
    this.defaultDate = new Date().toISOString();
    this.defaultType = "dead";
  }

  //posljemo podatke forma
  saveData() {
    this.viewCtrl.dismiss(this.activityData);
  }

  //posljemo prazne podatke
  closeModal() {
    this.viewCtrl.dismiss(null);
  }

  //izberemo sliko iz galerije
  pickPicture() {
    this.camera.getPicture({
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    }).then((imageData) => {
      this.base64Image = "data:image/jpeg;base64," + imageData;
      this.activityData.value.image = this.base64Image;
    }, (err) => {
      console.log(err);
    });
  }

  //posnamemo novo sliko s kamero
  takePicture() {
    this.camera.getPicture({
      destinationType: this.camera.DestinationType.DATA_URL,
    }).then((imageData) => {
      this.base64Image = "data:image/jpeg;base64," + imageData;
      this.activityData.value.image = this.base64Image;
    }, (err) => {
      console.log(err);
    });
  }

}
