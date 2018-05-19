import { Component, ViewChild } from '@angular/core';
import { NavController, Platform, ModalController, Modal } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker,
  LatLng,
  GoogleMapsAnimation,
  GoogleMapsMapTypeId
} from '@ionic-native/google-maps';

@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})

export class MapPage {

  map: GoogleMap;


  constructor(public navCtrl: NavController, private platform: Platform, public modalCtrl: ModalController, public geolocation: Geolocation) {
    platform.ready().then(() => {
      this.initMap();
    });
  }

  /*ionViewDidLoad() {
    this.initMap();
  }

  initMap() {
    this.geolocation.getCurrentPosition().then((position) => {

      let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

      let mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }

      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

    }, (err) => {
      console.log(err);
    });
  }

  addMarkerButton() {
    this.openActivityModal();
    //console.log(activityData);
    //subscribe

  }

  addInfoWindow(marker, content) {

    let infoWindow = new google.maps.InfoWindow({
      content: content
    });

    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    });

  }

  openActivityModal() {
    const activityModal: Modal = this.modalCtrl.create('ActivityPage');
    activityModal.present();
    activityModal.onWillDismiss((data) => {
      if (data != null) {
        let marker = new google.maps.Marker({
          map: this.map,
          animation: google.maps.Animation.DROP,
          position: this.map.getCenter()
        });
        let content = "<h4>" + data.value.title + "</h4>";
        this.addInfoWindow(marker, content);
      }
    });
  }*/

  /*loadMap() {

    let mapOptions: GoogleMapOptions = {
      camera: {
        target: {
          lat: 43.0741904,
          lng: -89.3809802
        },
        zoom: 18,
        tilt: 30
      }
    };

    //this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    this.map = GoogleMaps.create('map', mapOptions);

    // Wait the MAP_READY before using any methods.
    this.map.one(GoogleMapsEvent.MAP_READY)
      .then(() => {
        console.log('Map is ready!');

        // Now you can use all methods safely.
        this.map.addMarker({
          title: 'Ionic',
          icon: 'blue',
          animation: 'DROP',
          position: {
            lat: 43.0741904,
            lng: -89.3809802
          }
        })
          .then(marker => {
            marker.on(GoogleMapsEvent.MARKER_CLICK)
              .subscribe(() => {
                alert('clicked');
              });
          });

      });
  }*/

  initMap() {

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
  }

  onMapClick(params: any[]) {
    let latLng: LatLng = params[0];
    this.openActivityModal(latLng);
  }

  addMarkerButton() {
    this.geolocation.getCurrentPosition().then((resp) => {
      let latLng: LatLng = new LatLng(resp.coords.latitude, resp.coords.longitude);
      this.openActivityModal(latLng);
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

  openActivityModal(position: LatLng) {
    const activityModal: Modal = this.modalCtrl.create('ActivityPage');
    activityModal.present();
    activityModal.onWillDismiss((data) => {
      if (data != null) {
        let options: MarkerOptions = {
          title: data.value.title,
          position: { lat: position.lat, lng: position.lng },
          animation: GoogleMapsAnimation.DROP
        };

        this.map.addMarker(options).then((marker: Marker) => {
          marker.hideInfoWindow();
        });
      }
    });
  }

}
