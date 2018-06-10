import { Component } from '@angular/core';
import { NavController, Platform, ModalController, Modal, AlertController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { GoogleMaps, GoogleMap, GoogleMapsEvent, GoogleMapOptions, MarkerOptions, Marker, LatLng, GoogleMapsAnimation, GoogleMapsMapTypeId } from '@ionic-native/google-maps';
import { Storage } from '@ionic/storage';
import { FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { HomePage } from '../home/home';
import { ViewActivityPage } from '../viewActivity/viewActivity';
import { I18nDemoPage } from '../i18n-demo/i18n-demo.page';
import { GalleryPage } from '../gallery/gallery';

@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})

export class MapPage {

  map: GoogleMap;
  index: number;

  constructor(private navCtrl: NavController, private platform: Platform, private modalCtrl: ModalController,
    private geolocation: Geolocation, private storage: Storage, public navParams: NavParams, private alertCtrl: AlertController, private http: HttpClient) {
    //ko se vse zazene inicializiramo mapo
    platform.ready().then(() => {
      this.initMap();
      this.storage.get('markerData').then((markerData) => {
        if (markerData != null) {
          this.generateMarkers(markerData);
        }
      });
    });
  }

  //mapo inicializiramo glede na naso lokacijo, preko geolokacije, ustvarimo tudi click event
  /*initMap() {
    this.geolocation.getCurrentPosition().then((resp) => {
      let mapOptions: GoogleMapOptions = {
        mapTypeId: GoogleMapsMapTypeId.ROADMAP,
        camera: {
          target: {
            lat: resp.coords.latitude,
            lng: resp.coords.longitude
          },
          zoom: 18,
          tilt: 30
        }
      };

      this.map = GoogleMaps.create('map', mapOptions);
      this.map.on(GoogleMapsEvent.MAP_CLICK).subscribe(this.onMapClick.bind(this));
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }*/

  initMap() {
    if (typeof this.navParams.get('Latitude') === "undefined") {
      let mapOptions: GoogleMapOptions = {
        mapTypeId: GoogleMapsMapTypeId.ROADMAP,
        camera: {
          target: {
            lat: 46.5637542,
            lng: 15.6469096,
          },
          zoom: 16,
          tilt: 30
        }
      };
      this.map = GoogleMaps.create('map', mapOptions);
      this.map.on(GoogleMapsEvent.MAP_CLICK).subscribe(this.onMapClick.bind(this));
    } else {
      //this.showMapAndMarker()
    }
  }

  //ob kliku prvo pridobimo koordinate klika, ki jih nato posljemo v modalno okno
  onMapClick(params: any[]) {
    let latLng: LatLng = params[0];
    this.openAddActivityModal(latLng);
  }

  //ob kliku na gumb pridobimo nase koordinate, ki jih nato posljemo v modalno okno
  /*addMarkerButton() {
    this.geolocation.getCurrentPosition().then((resp) => {
      let latLng: LatLng = new LatLng(resp.coords.latitude, resp.coords.longitude);
      this.openActivityModal(latLng);
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }*/

  //ustvarimo marker
  createMarker(data: any) {
    //poljubni parametri za nas marker
    let options: MarkerOptions = {
      title: data.title,
      position: { lat: data.latitude, lng: data.longitude },
      animation: GoogleMapsAnimation.DROP
    };

    //ustvarimo marker
    this.map.addMarker(options).then((marker: Marker) => {
      marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(binder => {
        this.openViewActivityModal(binder, data);
      });
      //marker.hideInfoWindow();`
    });
  }

  //ustvarimo modalno okno in ob zaprtju vrnemo podatke, ce podatki niso null ustvarimo marker
  openAddActivityModal(position: LatLng) {
    const addActivityModal: Modal = this.modalCtrl.create('AddActivityPage');
    addActivityModal.present();
    addActivityModal.onWillDismiss((data) => {
      if (data != null) {
        //v podatke shranimo koordinate
        data.value.latitude = position.lat;
        data.value.longitude = position.lng;

        //ustvarimo marker
        this.createMarker(data.value);

        //shranimo podatke markerja v local storagu
        this.storage.get('markerData').then((markerData) => {
          if (markerData == null) {
            markerData = [data.value];
            this.storage.set('markerData', markerData);
          } else {
            markerData.push(data.value);
            this.storage.set('markerData', markerData);
          }
        });
      }

    });
  }

  openViewActivityModal(binder: any, data1: any) {
    const viewActivityModal: Modal = this.modalCtrl.create('ViewActivityPage', { data: data1 });
    viewActivityModal.present();
    viewActivityModal.onWillDismiss((data2) => {
      //ce dobimo podatke od modalnega okna jih shranimo, posljemo na bazo in izbrisemo iz local storega ter mape
      if (data2 == "Delete") {
        binder[1].remove();
        this.storage.get('markerData').then((markerData) => {
          this.compareArrays(markerData, data1);
          markerData.splice(this.index, 1);
          this.storage.set('markerData', markerData);
        });
      } else if (data2 != null) {
        this.storage.get('markerData').then((markerData) => {
          this.compareArrays(markerData, data2[0]);
          markerData[this.index] = data2[1];
          this.storage.set('markerData', markerData);
          binder[1].remove();
          this.generateMarkers([data2[1]]);
        });
      }
    });
  }

  //ustvarimo modalno okno za porocilo
  openAddTripModal() {
    //preverimo ce sploh imamo markerje na zemljevidu, ce jih ni ustvarimo alert
    this.storage.get('markerData').then((markerData) => {
      if (markerData != null) {
        const addTripModal: Modal = this.modalCtrl.create('AddTripPage');
        addTripModal.present();
        addTripModal.onWillDismiss((data) => {
          //ce dobimo podatke od modalnega okna jih shranimo, posljemo na bazo in izbrisemo iz local storega ter mape
          if (data != null) {
            //const report: Porocilo = new Porocilo(this.userID, data.value.title, data.value.date, this.activityConverter.arrayToActivities(markerData));
            //this.reportREST.savePorocilo(report).subscribe();
            this.clearMap();
          }
        });
      } else {
        //ustvarimo alert
        let alert = this.alertCtrl.create({
          title: 'No activities',
          subTitle: 'You have no activities on your map! Please add some and then send a trip.',
          buttons: ['OK']
        });
        alert.present();
      }
    });
  }

  //odpremo modalno okno, ki nam prikaze vsa nasa porocila
  openGetTripModal() {
    const getTripModal: Modal = this.modalCtrl.create('GetTripPage');
    getTripModal.present();
    getTripModal.onWillDismiss((data) => {
      //ce izberemo porocilo ga prikazemo na mapi
      if (data != null) {
        //const report: any = data;
        //const markerData = this.activityConverter.activitiesToArray(report);
        this.clearMap();
        //this.generateMarkers(markerData);
      }
    });
  }

  //generiramo markerje glede na array
  generateMarkers(markerData) {
    markerData.forEach(element => {
      this.createMarker(element);
    });
  }

  //pocistimo mapo in local storage
  clearMap() {
    this.storage.remove("markerData");
    this.map.clear();
  }

  compareArrays(arrArr: any, arrElement: any) {
    this.index = -1;
    var indexTemp = 0
    arrArr.forEach(element => {
      if (JSON.stringify(element) === JSON.stringify(arrElement)) {
        this.index = indexTemp;
      }
      indexTemp++;
    });
  }

  hometab() {
    this.navCtrl.setRoot(HomePage);
  }

  viewActivitytab() {
    this.navCtrl.setRoot(ViewActivityPage);
  }

  settingstab() {
    this.navCtrl.setRoot(I18nDemoPage);
  }

  viewGallery() {
    this.navCtrl.setRoot(GalleryPage);
  }
  /*
  showMapAndMarker(){
    let mapOptions: GoogleMapOptions = {
      mapTypeId: GoogleMapsMapTypeId.ROADMAP,
      camera: {
        target: {
          lat: this.navParams.get('Latitude'),
          lng: this.navParams.get('Longitude')
        },
        zoom: 16,
        tilt: 30
      }
    };
    
    this.map = GoogleMaps.create('map', mapOptions);
    this.map.on(GoogleMapsEvent.MAP_CLICK).subscribe(this.onMapClick.bind(this));

    console.log(this.map);
    

    let options: MarkerOptions = {
      title: this.navParams.get('NazivKordinat'),
      position: { lat: this.navParams.get('Latitude'), lng: this.navParams.get('Longitude') },
      animation: GoogleMapsAnimation.DROP
    };
    console.log("DelaDosemTudi");
    this.map.addMarker(options);
  }
  */

}
