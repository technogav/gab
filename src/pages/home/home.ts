import { Component, ElementRef, NgModule, NgZone, OnInit, ViewChild } from '@angular/core';
import { NavController, Platform, AlertController, ModalController } from 'ionic-angular';
import { BrowserModule } from "@angular/platform-browser";
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { RestModalPage } from '../rest-modal/rest-modal';
import { } from 'googlemaps';
import { AgmCoreModule, MapsAPILoader } from '@agm/core';
import { FormControl, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Geolocation } from '@ionic-native/geolocation';
import { GeoServiceProvider } from '../../providers/geo-service/geo-service';
import { FilterModalPage } from '../filter-modal/filter-modal';
import { LoginModalPage } from '../login-modal/login-modal';//if click rest details & logged out show modal

export class AppComponent {
  title: string = 'My first AGM project';
  lat2: number = 51.678418;
  lng2: number = 7.809007;
}

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  @ViewChild("search")public searchElementRef: ElementRef;  
  @ViewChild('map')mapElement: ElementRef;

  public infoWindowOpen: boolean = false;
  public items: Observable<any[]>;
  public rests= this.GeoService.getRests();
  public searchControl: FormControl;
  public zoom: number;
  public lat3: any;
  public long3: any;
  public icon = {
  url: '../../assets/imgs/locationDot.gif',
    scaledSize: {
      width: 40,
      height: 40
    }
  };
  public styles = [
    {
        "featureType": "administrative.locality",
        "elementType": "all",
        "stylers": [
            {
                "hue": "#c79c60"
            },
            {
                "saturation": 7
            },
            {
                "lightness": 19
            },
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "administrative.locality",
        "elementType": "geometry",
        "stylers": [
            {
                "visibility": "off"
            },
            {
                "hue": "#ff0000"
            },
            {
                "saturation": "18"
            }
        ]
    },
    {
        "featureType": "administrative.locality",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "hue": "#ff0000"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "all",
        "stylers": [
            {
                "hue": "#ffffff"
            },
            {
                "saturation": -100
            },
            {
                "lightness": 100
            },
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "all",
        "stylers": [
            {
                "hue": "#ffffff"
            },
            {
                "saturation": -100
            },
            {
                "lightness": 100
            },
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "saturation": "30"
            },
            {
                "hue": "#00ff07"
            },
            {
                "lightness": "-13"
            },
            {
                "gamma": "1.22"
            },
            {
                "weight": "1.00"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [
            {
                "hue": "#c79c60"
            },
            {
                "saturation": -52
            },
            {
                "lightness": -10
            },
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels",
        "stylers": [
            {
                "hue": "#c79c60"
            },
            {
                "saturation": -93
            },
            {
                "lightness": 31
            },
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "labels",
        "stylers": [
            {
                "hue": "#c79c60"
            },
            {
                "saturation": -93
            },
            {
                "lightness": -2
            },
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "geometry",
        "stylers": [
            {
                "hue": "#c79c60"
            },
            {
                "saturation": -52
            },
            {
                "lightness": -10
            },
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "all",
        "stylers": [
            {
                "hue": "#c79c60"
            },
            {
                "saturation": 10
            },
            {
                "lightness": 69
            },
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "all",
        "stylers": [
            {
                "hue": "#c79c60"
            },
            {
                "saturation": -78
            },
            {
                "lightness": 67
            },
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "hue": "#0055ff"
            },
            {
                "gamma": "2.85"
            },
            {
                "saturation": "50"
            },
            {
                "lightness": "-6"
            }
        ]
    }
];

constructor(
    public agm:AgmCoreModule,
    public alertCtrl: AlertController,
    public modalCtrl: ModalController,
    private geolocation: Geolocation,
    private mapsAPILoader: MapsAPILoader,
    private GeoService : GeoServiceProvider,
    private ngZone: NgZone){ 
    //this.items = db.collection('items').valueChanges(); 
    
    //this.showAlert();
    //this.openModal();

    this.geolocation.getCurrentPosition().then((resp) => {
      // resp.coords.latitude
      // resp.coords.longitude
      this.lat3 = resp.coords.latitude;
      this.long3 = resp.coords.longitude;
     }).catch((error) => {
       console.log('Error getting location', error);
     });

     /* let watch = this.geolocation.watchPosition();
      watch.subscribe((data) => {
      // data can be a set of coordinates, or an error (if an error occurred).
      // data.coords.latitude
      // data.coords.longitude

      this.lat3 = data.coords.latitude;
      this.long3 = data.coords.longitude;

      //dont forget to unsubscribe to stop memory leaks
      }); */


  }//end constructor

  ngOnInit() {
    //set google maps defaults
    this.zoom = 4;
    //create search FormControl
    this.searchControl = new FormControl();
     
    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ["address"]
      });
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();
  
          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
          
          //set latitude, longitude and zoom
          this.lat3 = place.geometry.location.lat();
          this.long3 = place.geometry.location.lng();
          this.zoom = 12;
        });
      });
    });
  }

  //get map coords
  showMapClick(ev){
    console.log(ev);
  }

  public openLoginModal(){
      console.log("here");
    let modal = this.modalCtrl.create(LoginModalPage );

    /* modal.onDidDismiss(data => {
      //console.log("close info window?");
      this.infoWindowOpen = !this.infoWindowOpen
      
    }); */

    modal.present();
  }

  public getCurrentPosition(search){
 console.log(search);

 search.value="";
 
 console.log(this.searchControl.value);
    this.geolocation.getCurrentPosition().then((resp) => {
        // resp.coords.latitude
        // resp.coords.longitude
        this.lat3 = resp.coords.latitude;
        this.long3 = resp.coords.longitude;
       }).catch((error) => {
         console.log('Error getting location', error);
       });
  }

  openFilterModal() {

    
    let modal = this.modalCtrl.create(FilterModalPage );

    /* modal.onDidDismiss(data => {
      //console.log("close info window?");
      this.infoWindowOpen = !this.infoWindowOpen
      
    }); */

    modal.present();
  }

  

  openModal() {

    this.openLoginModal();

    
    /* let modal = this.modalCtrl.create(RestModalPage );

    modal.onDidDismiss(data => {
      //console.log("close info window?");
      this.infoWindowOpen = !this.infoWindowOpen
      
    });

    modal.present(); */
  }

  
  /* initMap() {

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

  }*/

  public closeIt(){
    console.log('item, i');

    //item.close();
  }

  onInput(){

  }

  onCancel(){
    
  }


  /* showAlert() {
    let alert = this.alertCtrl.create({
      title: 'Offline!',
      subTitle: "Ooop's you have lost connectivity",
      buttons: ['OK']
    });
    alert.present();
  } */



  //////////////////////////////////////////////////////////////////////


  /* 
  import { Component, ElementRef, NgModule, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { AgmCoreModule, MapsAPILoader } from '@agm/core';

@Component({
  selector: 'my-app',
  styles: [`
    agm-map {
       height: 300px;
     }
  `],
  template: `
    <div class="container">
      <h1>Angular 2 + Google Maps Places Autocomplete</h1>
      <div class="form-group">
        <input placeholder="search for location" autocorrect="off" autocapitalize="off" 
        spellcheck="off" type="text" class="form-control" #search [formControl]="searchControl">
      </div>
      <agm-map [latitude]="latitude" [longitude]="longitude" [scrollwheel]="false" [zoom]="zoom">
        <agm-marker [latitude]="latitude" [longitude]="longitude"></agm-marker>
      </agm-map>
    </div>
  `
})
export class App implements OnInit {
  
  public latitude: number;
  public longitude: number;
  public searchControl: FormControl;
  public zoom: number;
  
  @ViewChild("search")
  public searchElementRef: ElementRef;
  
  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
  ) {}
  
  ngOnInit() {
    //set google maps defaults
    this.zoom = 4;
    this.latitude = 39.8282;
    this.longitude = -98.5795;
    
    //create search FormControl
    this.searchControl = new FormControl();
    
    //set current position
    this.setCurrentPosition();
    
    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ["address"]
      });
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();
  
          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
          
          //set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = 12;
        });
      });
    });
  }
  
  private setCurrentPosition() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 12;
      });
    }
  }
}

@NgModule({
  imports: [ 
    AgmCoreModule.forRoot({
      libraries: ["places"]
    }),
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [ App ],
  bootstrap: [ App ]
})
export class AppModule {}
  */



}
