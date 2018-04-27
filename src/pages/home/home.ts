import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, Platform, AlertController, ModalController } from 'ionic-angular';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { RestModalPage } from '../rest-modal/rest-modal';
import{} from '@types/googlemaps --save-dev';



declare var google: any;
let map: any;
let infowindow: any;
let options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  items: Observable<any[]>;

    
  @ViewChild('map')mapElement: ElementRef;

  constructor(
    private db: AngularFirestore,
    public alertCtrl: AlertController,
    public modalCtrl: ModalController){ 
    this.items = db.collection('items').valueChanges(); 
    this.initMap();
    //this.showAlert();
    //this.openModal();
  }

  hello(){
    alert("hello");
  }

  openModal() {

    let modal = this.modalCtrl.create(RestModalPage );
    modal.present();
  }

  
  initMap() {

    console.log(this.mapElement);
    navigator.geolocation.getCurrentPosition((location) => {
      console.log(location);
      map = new google.maps.Map(this.mapElement.nativeElement, {
        center: {lat: location.coords.latitude, lng: location.coords.longitude},
        zoom: 15
      });
  
      infowindow = new google.maps.InfoWindow();
      var service = new google.maps.places.PlacesService(map);
      service.nearbySearch({
        location: {lat: location.coords.latitude, lng: location.coords.longitude},
        radius: 1000,
        type: ['store']
      }, (results,status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          for (var i = 0; i < results.length; i++) {
            this.createMarker(results[i]);
            console.log(results[i]);
          }
        }
      });
    }, (error) => {
      console.log(error);
    }, options);
    var myplace = {lat: -33.8665, lng: 151.1956};
  }

  createMarker(place) {
    var placeLoc = place.geometry.location;
    console.log(placeLoc);
    var marker = new google.maps.Marker({
      map: map,
      position: placeLoc
    });
  
    google.maps.event.addListener(marker, 'click', function() {
      //infowindow.setContent(place.name);
      this.openModal();
      infowindow.open(map, this);
    });

  }

  


  /* showAlert() {
    let alert = this.alertCtrl.create({
      title: 'Offline!',
      subTitle: "Ooop's you have lost connectivity",
      buttons: ['OK']
    });
    alert.present();
  } */



}