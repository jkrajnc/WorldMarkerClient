import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RegisterPage } from '../register/register';
import { Http } from '@angular/http';

import { WebservicesProvider } from '../../providers/webservices/webservices';
import { HomePage } from '../home/home';


import { AlertController } from 'ionic-angular';



@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  @ViewChild('username') uname;
  @ViewChild('password') pass;
  posts: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public http: Http, public webservices: WebservicesProvider) {
    

    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  showAlert() {
    let alert = this.alertCtrl.create({
      title: 'Napaka',
      subTitle: 'Uporabniško ime ali geslo ni pravilno',
      buttons: ['OK']
    });
    alert.present();
  }

  signIn() {
    if (this.uname.value == "" || this.pass.value == "" ) {
      let alert = this.alertCtrl.create({
        title: 'Napaka',
        subTitle: 'Vnesite podatke',
        buttons: ['OK']
      });
      alert.present(); 
    } else {
      const podatki = this.webservices.getUporabnik(this.uname.value, this.pass.value)
      podatki.then(data => {
      console.log(data)
      if (data.message == "Ne obstaja") {
        this.showAlert() 
      } else {
        console.log(data)
        this.navCtrl.setRoot(HomePage);
      }
    });  


    } 
    //console.log(this.uname.value, this.pass.value);
   //this.navCtrl.push(KolesauporabnikaPage);
  }
  


  register() {
    this.navCtrl.push(RegisterPage);
  }

}




