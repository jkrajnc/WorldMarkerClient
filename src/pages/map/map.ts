import { Component } from '@angular/core';
import { NavController, Platform, ModalController, Modal, AlertController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { GoogleMaps, GoogleMap, GoogleMapsEvent, GoogleMapOptions, MarkerOptions, Marker, LatLng, GoogleMapsAnimation, GoogleMapsMapTypeId } from '@ionic-native/google-maps';
import { Storage } from '@ionic/storage';
import { FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})

export class MapPage {

  map: GoogleMap;
  index: number;

  constructor(private navCtrl: NavController, private platform: Platform, private modalCtrl: ModalController,
    private geolocation: Geolocation, private storage: Storage, private alertCtrl: AlertController, private http: HttpClient) {
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
    let mapOptions: GoogleMapOptions = {
      mapTypeId: GoogleMapsMapTypeId.ROADMAP,
      camera: {
        target: {
          lat: 40.730610,
          lng: -73.935242
        },
        zoom: 16,
        tilt: 30
      }
    };

    this.map = GoogleMaps.create('map', mapOptions);
    this.map.on(GoogleMapsEvent.MAP_CLICK).subscribe(this.onMapClick.bind(this));
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
          /*this.compareArrays(markerData, data1).then(binder => {
            console.log(binder);
          });*/
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

}
