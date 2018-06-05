import { Component } from '@angular/core';
import { IonicPage, ViewController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Camera } from '@ionic-native/camera';

@IonicPage()
@Component({
  selector: 'page-ediActivity',
  templateUrl: 'editActivity.html',
})
export class EditActivityPage {

  private activityData: FormGroup;
  private base64Image: string;
  private varType: string;

  constructor(private viewCtrl: ViewController, private navParams: NavParams, private formBuilder: FormBuilder, private camera: Camera) {
    //pridobimo in napolnimo podatke
    const data = this.navParams.get("data");
    this.activityData = this.formBuilder.group({
      title: [data.title, Validators.required],
      type: [data.type, Validators.required],
      date: [data.date, Validators.required],
      description: [data.description],
      image: [data.image],
      latitude: [data.latitude],
      longitude: [data.longitude],
      gameType: [data.gameType],
      gameCategory: [data.gameCategory]
    });
    this.base64Image = data.image;
    this.varType = data.type;
  }

  //posljemo podatke forma
  editData() {
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
