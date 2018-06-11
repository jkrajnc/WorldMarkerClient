
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
/*
  Generated class for the WebservicesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class WebservicesProvider {

  //povezava: string = "http://localhost:3000";
  povezava: string = "https://murmuring-mountain-34739.herokuapp.com";

  constructor(public http: Http) {
    console.log('Hello WebservicesProvider Provider');
  }

  /*
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
*/

  async getPotovanja(IdUporabnika) {

    const url = `${this.povezava}/potovanje/${IdUporabnika}`;
    //console.log(url);
    const response = await fetch(url);
    const data = await response.json();
    var temp = []
    //console.log("Dela");
    if (data.message == "Ni potovanj") {
      //this.showAlert();
    } else {
      for (var stevec = 0; stevec < data.length; stevec++) {
        var aktivnosti = this.getAktivnostiOdPotovanja(data[stevec]["IdPotovanje"], data[stevec]);
        await aktivnosti.then(function (result) {
          //console.log(stevec) Tu izpiše obakrat 1, 1
          temp.push(result);
          //console.log(result)
        });
      }
      return this.convertTripToClientJSON(temp);
    };
  };

  async getAktivnostiOdPotovanja(IdPotovanja, podatki) {

    const url = `${this.povezava}/aktivnosti/${IdPotovanja}`;
    //console.log(url);
    const response = await fetch(url);
    const data = await response.json();
    //console.log(data);
    if (data.message == "Ni potovanj") {
      //this.showAlert();
    } else {
      podatki["Aktivnosti"] = data
      return podatki;
    }
  };

  postPotovanja(NazivPotovanja, OpisPotovanja, DatumPotovanja, ArrayAktivnosti) {
    //console.log(DatumPotovanja.substring());
    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });
    const postParams = {
      nazivPotovanja: NazivPotovanja,
      opisPotovanja: OpisPotovanja,
      datumPotovanja: DatumPotovanja,
    }
    console.log(postParams)
    this.http.post(`${this.povezava}/potovanje`, postParams, options)
      .subscribe(data => {
        console.log(data["_body"]);
        console.log(ArrayAktivnosti.length)
        for (var stevec = 0; stevec < ArrayAktivnosti.length; stevec++) {
          /*this.postAktivnost(ArrayAktivnosti[stevec]["nazivAktivnosti"], ArrayAktivnosti[stevec]["opisAktivnosti"],
            ArrayAktivnosti[stevec]["tipAktivnosti"], ArrayAktivnosti[stevec]["datumAktivnosti"],
            ArrayAktivnosti[stevec]["latitude"], ArrayAktivnosti[stevec]["longitude"],
            ArrayAktivnosti[stevec]["nazivSlike"], ArrayAktivnosti[stevec]["ImgData"],
            data["_body"])*/
            this.postAktivnost(ArrayAktivnosti[stevec]["title"], ArrayAktivnosti[stevec]["description"],
            ArrayAktivnosti[stevec]["type"], ArrayAktivnosti[stevec]["date"],
            ArrayAktivnosti[stevec]["latitude"], ArrayAktivnosti[stevec]["longitude"],
            null, ArrayAktivnosti[stevec]["image"], data["_body"]);
        }

      }, error => {
        console.log(error);// Error posting the data
      });
  };

  postAktivnost(nazivAktivnosti, opisAktivnosti, tipAktivnosti, datumAktivnosti, latitude, longitude, nazivSlike, ImgData, IdPotovanja) {
    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });
    const postParams = {
      nazivAktivnosti: nazivAktivnosti,
      opisAktivnosti: opisAktivnosti,
      tipAktivnosti: tipAktivnosti,
      datumAktivnosti: datumAktivnosti,
      latitude: latitude,
      longitude: longitude,
      nazivSlike: nazivSlike,
      ImgData: ImgData,
      IdPotovanja: IdPotovanja,
    }
    //console.log(rows)
    this.http.post(`${this.povezava}/aktivnosti`, postParams, options)
      .subscribe(data => {
        console.log(data);

      }, error => {
        console.log(error);// Error posting the data
      });
  };

  async getVseSlike() {

    const url = `${this.povezava}/slika`;
    const response = await fetch(url);
    const data = await response.json();
    if (data.message == "Ni slik") {
      //this.showAlert();
    } else {
      return data;
    }
  };
  /*
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
  */



  async getUporabnik(username, password) {

    const url = `${this.povezava}/uporabniki?username=${username}&password=${password}`;
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    if (data.message == "Ne obstaja") {
      return data;
    } else {
      return data;
    }
  };

  postUporabnika(Username, Password, Name, Priimek, Email) {
    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json');
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
    this.http.post(`${this.povezava}/uporabniki`, postParams, options)
      .subscribe(data => {
        console.log(data['_body']);
      }, error => {
        console.log(error);// Error posting the data
      });
  };

  async getZanimivosti() {

    const url = `${this.povezava}/zanimivosti`;
    const response = await fetch(url);
    const data = await response.json();
    if (data.message == "Ni zanimivosti") {
      //this.showAlert();
    } else {
      return this.convertOddityToClientJSON(data);
    }
  };

  convertOddityToClientJSON(oldArr) {
    const newArr = [];
    oldArr.forEach(element => {
      const tempArr = {
        title: element.NazivZnamenitosti,
        description: element.opis,
        image: element.ImgData,
        latitude: element.latitude,
        longitude: element.longitude
      };
      newArr.push(tempArr);
    });
    return newArr;
  }

  /*convertTripToClientJSON(oldArr) {
    const newArr = [];
    console.log(oldArr);
    oldArr.forEach(element1 => {

      const activitiesArr = []
      element1.array.forEach(element2 => {
        const tempArr2 = {
          title: element2.NazivAktivnosti,
          description: element2.opisAktivnosti,
          type: element2.tipAktivnosti,
          date: element2.datumAktivnosti,
          image: element2.ImgData,
          latitude: element2.latitude,
          longitude: element2.longitude
        };

        activitiesArr.push(tempArr2);
      });

      const tempArr1 = {
        title: element1.NazivPotovanja,
        description: element1.OpisPotovanja,
        date: element1.DatumPotovanja,
        //activities: activitiesArr
      };

      newArr.push(tempArr1);
    });
    console.log(newArr);
    return newArr;
  }*/

  convertTripToClientJSON(oldArr) {
    const newArr = [];
    oldArr.forEach(element => {

      const activitiesArr = []
      element.Aktivnosti.forEach(element1 => {
        const tempArr2 = {
          title: element1.NazivAktivnosti,
          description: element1.OpisAktivnosti,
          type: element1.TipAktivnosti,
          date: element1.DatumAktivnosti,
          image: element1.ImgData,
          latitude: element1.latitude,
          longitude: element1.longitude
        };
        activitiesArr.push(tempArr2);
      });

      const tempArr = {
        title: element.NazivPotovanja,
        description: element.OpisPotovanja,
        date: element.DatumPotovanja,
        activities: activitiesArr
      };

      newArr.push(tempArr);
    });
    return newArr;
  }


}
