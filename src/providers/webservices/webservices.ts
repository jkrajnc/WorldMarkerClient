
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
/*
  Generated class for the WebservicesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class WebservicesProvider {

  constructor(public http: Http) {
    console.log('Hello WebservicesProvider Provider');
  }

  async getKordinate() {
   
    const url = `https://murmuring-mountain-34739.herokuapp.com/kordinate`;
    const response = await fetch(url);
    const data = await response.json();
    if (data.message == "Ni kordinat") {
      //this.showAlert();
    } else {
        data.then(podatki => {
            console.log("podatki");
            console.log(podatki);
            return(podatki);         
          });
    }      
  }

postKordinate(NazivKordinat, Latitude, Longitude) {
    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json' );
    let options = new RequestOptions({ headers: headers });

    const postParams = {
      naziv: NazivKordinat,
      lat: Latitude,
      long: Longitude,
    }

    var rows = JSON.parse(JSON.stringify(postParams));
    console.log(rows)
    this.http.post("https://murmuring-mountain-34739.herokuapp.com/kordinate", postParams, options)
      .subscribe(data => {
        console.log(data['_body']);
       }, error => {
        console.log(error);// Error posting the data
      });
};

async getPotovanja() {

    const url = `https://murmuring-mountain-34739.herokuapp.com/potovanja`;
    const response = await fetch(url);
    const data = await response.json();
    if (data.message == "Ni potovanj") {
      //this.showAlert();
    } else {
      return data;
    }      
};

postPotovanja (NazivPotovanja, Pot) {
    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json' );
    let options = new RequestOptions({ headers: headers });
    const postParams = {
      naziv: NazivPotovanja,
      pot: Pot,
    }

    var rows = JSON.parse(JSON.stringify(postParams));
    //console.log(rows)
    this.http.post("https://murmuring-mountain-34739.herokuapp.com/potovanja", postParams, options)
      .subscribe(data => {
        console.log(data['_body']);
       }, error => {
        console.log(error);// Error posting the data
      });
};

async getSlika() {

    const url = `https://murmuring-mountain-34739.herokuapp.com/slika`;
    const response = await fetch(url);
    const data = await response.json();
    if (data.message == "Ni potovanj") {
      //this.showAlert();
    } else {
      return data;
    }      
};

postSlika (NazivSlike, ImgData) {

    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json' );
    let options = new RequestOptions({ headers: headers });
    const postParams = {
      naziv: NazivSlike,
      popodatkit: ImgData,
    }

    var rows = JSON.parse(JSON.stringify(postParams));
    //console.log(rows)
    this.http.post("https://murmuring-mountain-34739.herokuapp.com/slika", postParams, options)
      .subscribe(data => {
        console.log(data['_body']);
       }, error => {
        console.log(error);// Error posting the data
      });
};

async getSlikaZKordinatom() {

    const url = `https://murmuring-mountain-34739.herokuapp.com/slikazkordinatom`;
    const response = await fetch(url);
    const data = await response.json();
    if (data.message == "Ni potovanj") {
      //this.showAlert();
    } else {
      return data;
    }      
};

postSlikaZKordinatom (NazivSlike, ImgData, NazivKordinat, Latitude, Longitude) {
    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json' );
    let options = new RequestOptions({ headers: headers });
    const postParams = {
        nazivslike: NazivSlike,
        slikadata: ImgData,
        nazivlokacije: NazivKordinat,
        latitude: Latitude,
        longitude: Longitude,
    }

    var rows = JSON.parse(JSON.stringify(postParams));
    //console.log(rows)
    this.http.post("https://murmuring-mountain-34739.herokuapp.com/slikazkordinatom", postParams, options)
      .subscribe(data => {
        console.log(data['_body']);
       }, error => {
        console.log(error);// Error posting the data
      });
};

async getUporabnik() {

    const url = `https://murmuring-mountain-34739.herokuapp.com/uporabnik`;
    const response = await fetch(url);
    const data = await response.json();
    if (data.message == "Ni potovanj") {
      //this.showAlert();
    } else {
      return data;
    }      
};

postUporabnika (Username, Password, Name, Priimek, Email) {
    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json' );
    let options = new RequestOptions({ headers: headers });
    const postParams = {
        username: Username,
        password: Password,
        ime: Name,
        priimek: Priimek,
        email: Email,
    }

    //var rows = JSON.parse(JSON.stringify(postParams));
    //console.log(rows)
    this.http.post("https://murmuring-mountain-34739.herokuapp.com/slikazkordinatom", postParams, options)
      .subscribe(data => {
        console.log(data['_body']);
       }, error => {
        console.log(error);// Error posting the data
      });
};

}
