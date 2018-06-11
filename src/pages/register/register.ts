import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';


import { AlertController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { LoginPage } from '../login/login';
import { WebservicesProvider } from '../../providers/webservices/webservices';


/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  @ViewChild('username') uname;
  @ViewChild('password') pass;
  @ViewChild('name') name;
  @ViewChild('surname') suname;
  @ViewChild('email') mail;
  

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public alertCtrl: AlertController, public webservices: WebservicesProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  registerIn(){

    if (this.uname.value == "" || this.pass.value == "" || this.name.value == "" || this.suname.value == "" || this.mail.value == "" ) {
      this.showAlert();
    } else {
      this.webservices.postUporabnika(this.uname.value, this.pass.value,this.name.value,this.suname.value,this.mail.value)
      this.navCtrl.push(LoginPage);
    } 
  }


  showAlert() {
    let alert = this.alertCtrl.create({
      title: 'Napaka',
      subTitle: 'Vnesi v vsa polja',
      buttons: ['OK']
    });
    alert.present();
  }
    
         
}


