import { Component } from '@angular/core';
import { IonicPage, ViewController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Camera } from '@ionic-native/camera';

@IonicPage()
@Component({
  selector: 'page-activity',
  templateUrl: 'activity.html',
})
export class ActivityPage {

  private activityData: FormGroup;
  private base64Image: string;
  private defaultDate: string;
  private defaultType: string;

  constructor(private viewCtrl: ViewController, private formBuilder: FormBuilder, private camera: Camera) {
    this.activityData = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      type: ['', Validators.required],
      date: ['', Validators.required],
      image: ['']
    });
    this.defaultDate = new Date().toISOString();
    this.defaultType = "f";
  }

  saveData() {
    this.viewCtrl.dismiss(this.activityData);
  }

  closeModal() {
    this.viewCtrl.dismiss(null);
  }

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
