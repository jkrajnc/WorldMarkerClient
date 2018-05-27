import { Component } from '@angular/core';
import { IonicPage, ViewController, NavParams, ModalController, Modal } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-viewActivity',
  templateUrl: 'viewActivity.html',
})
export class ViewActivityPage {

  private activityData: FormGroup;
  private base64Image: string;
  private varType: string;
  private data: any;

  constructor(private viewCtrl: ViewController, private navParams: NavParams, private modalCtrl: ModalController, private formBuilder: FormBuilder) {
    //pridobimo in napolnimo podatke
    this.data = this.navParams.get("data");
    this.activityData = this.formBuilder.group({
      title: [{
        value: this.data.title,
        disabled: true
      }],
      type: [{
        value: this.data.type,
        disabled: true
      }],
      date: [{
        value: this.data.date,
        disabled: true
      }],
      description: [{
        value: this.data.description,
        disabled: true
      }],
      gameType: [{
        value: this.data.gameType,
        disabled: true
      }],
      gameCategory: [{
        value: this.data.gameCategory,
        disabled: true
      }],
      image: [this.data.image],
      latitude: [this.data.latitude],
      longitude: [this.data.longitude]
    });
    this.base64Image = this.data.image;
    this.varType = this.data.type;
  }

  //posljemo prazne podatke
  closeModal() {
    this.viewCtrl.dismiss(null);
  }

  //posljemo niz, ki nam pove kako se naj obnasamo
  deleteActivity() {
    this.viewCtrl.dismiss("Delete");
  }

  openEditActivityModal() {
    const editActivityModal: Modal = this.modalCtrl.create('EditActivityPage', { data: this.data });
    editActivityModal.present();
    editActivityModal.onWillDismiss((data1) => {
      if (data1 != null) {
        const editData = [this.data, data1.value];
        this.viewCtrl.dismiss(editData);
      }
    });
  }

}
