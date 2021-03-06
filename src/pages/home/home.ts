import { Component, ElementRef, NgModule, NgZone, OnInit, ViewChild } from '@angular/core';
import { NavController, Platform, AlertController, ModalController } from 'ionic-angular';
import { BrowserModule } from "@angular/platform-browser";
//import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { RestModalPage } from '../rest-modal/rest-modal';
import { } from 'googlemaps';
import { AgmCoreModule, MapsAPILoader } from '@agm/core';
//import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

import { FormControl } from "@angular/forms";
import { Geolocation } from '@ionic-native/geolocation';
import { GeoServiceProvider } from '../../providers/geo-service/geo-service';
import { FilterModalPage } from '../filter-modal/filter-modal';
import { LoginModalPage } from '../login-modal/login-modal';//if click rest details & logged out show modal

/* export class AppComponent {
  title: string = 'Gab';
  lat2: number;
  lng2: number;

  constructor(){
    this.lat2 = 51.678418;
    this.lng2 = 7.809007;
  }
} */

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

    item: any;
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
                    width:28,
                    height: 28
                    }
                };
    public custom_marker = {
        url: '../../assets/imgs/custom_marker_examp.png',
            scaledSize: {
            width:40,
            height: 40
            }
        }; 
        
    public currentLat:any;
    public currentLong:any;    
    public zoomLevel:number = 4;
    public markerLat:number;
    public markerLong:number;
    public markerOpen: boolean = false;
    public markerImg: string;
    public markerName: string;
    public markerCurrentDeal: string;
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
    mapCenterLng: number;
    mapCenterLat: number;
    currentLocLat: number;
    currentLocLng: number;
    tempMap : { lat: number, lng:number };
   
    infoWindowOpening(){
        console.log('owej');
    }

    constructor(
        public agm:AgmCoreModule,
        public alertCtrl: AlertController,
        public modalCtrl: ModalController,
        private geolocation: Geolocation,
        private mapsAPILoader: MapsAPILoader,
        private GeoService : GeoServiceProvider,
        private ngZone: NgZone,
        //private auth: AuthServiceProvider
        ){ 
        //this.items = db.collection('items').valueChanges(); 
        
        
        //this.showAlert();
        //this.openModal();

        this.geolocation.getCurrentPosition().then((resp) => {
 
        //console.log(resp.coords.latitude, 001);
        this.mapCenterLat = resp.coords.latitude;
        this.mapCenterLng = resp.coords.longitude;
        this.currentLocLat = resp.coords.latitude;
        this.currentLocLng = resp.coords.longitude;
        this.tempMap = { lat: resp.coords.latitude, lng: resp.coords.longitude };
    
        
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

    //track drag center
    public trackCenter(event){
        //set new center
        if(event){
            this.tempMap['lat'] = event.lat;
            this.tempMap['lng'] = event.lng;
        }
    }

    //reassign map center after drag
    public setNewCenter(){
        
        if(this.mapCenterLat && this.mapCenterLng){
            this.mapCenterLat = this.tempMap.lat;
            this.mapCenterLng = this.tempMap.lng;
        }
        
    }

    ngOnInit() {

        console.log(this.mapElement); 

        //this.mapElement.click(()=>{console.log('dsuifv')});

        //set google maps defaults
        this.zoom = this.zoomLevel;
        //create search FormControl
        this.searchControl = new FormControl();
        
        //load Places Autocomplete
        this.mapsAPILoader.load().then(() => {
        /* let newDragCenter = new google.maps.event;
        newDragCenter.addListener(map,'idle',() =>{

        }) */
        let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
            types: ["geocode"],
            
        });

        autocomplete.setComponentRestrictions(
            {
                'country': ['ie']
            }
        );

        autocomplete.addListener("place_changed", () => {
            this.ngZone.run(() => {
            //get the place result
            let place: google.maps.places.PlaceResult = autocomplete.getPlace();

            //verify result
            if (place.geometry === undefined || place.geometry === null) {
                return;
            }
            
            //set latitude, longitude and zoom
            
            this.mapCenterLat = place.geometry.location.lat();
            this.mapCenterLng = place.geometry.location.lng();
            /* this.lat3 = place.geometry.location.lat();
            this.long3 = place.geometry.location.lng(); */
            this.zoom = 12;
            });
        });
        });
    }

    public markerInfo(item){ 
        this.item = item;
        this.markerLat = item.lat;
        this.markerLong = item.long;
        this.markerOpen = true;
        /* this.markerImg = item.img;
        this.markerName = item.name;
        this.markerCurrentDeal = item.currentDeal['dealDesc']; */
    }

    

    //close info
    public mapClick(ev){
        console.log(ev);
        this.markerOpen = !this.markerOpen;
    }

    //if not logged in open login modal
    public openLoginModal(){
        let modal = this.modalCtrl.create(LoginModalPage );

        modal.onDidDismiss(data => {
            //this.infoWindowOpen = !this.infoWindowOpen 
        });
        modal.present();
    }

    returnToPosition(search){

    }

    public getCurrentPosition(search){
        search.value="";

        //console.log(this.searchControl.value);
        this.geolocation.getCurrentPosition().then((resp) => {
        this.mapCenterLat = resp.coords.latitude;
        this.mapCenterLng = resp.coords.longitude;
        }).catch((error) => {
            console.log('Error getting location', error);
        });
    }

    public resetMap(){
        this.geolocation.getCurrentPosition().then((resp) => { 
            this.mapCenterLat = resp.coords.latitude;
            this.mapCenterLng = resp.coords.longitude;

        }).catch((error) => {
            console.log('Error getting location', error);
        });
    }

    public openFilterModal() {   
        let modal = this.modalCtrl.create(FilterModalPage );
        /* modal.onDidDismiss(data => {
        //console.log("close info window?");
        this.infoWindowOpen = !this.infoWindowOpen     
        }); */
        modal.present();
    }

    openModal(markerInfo) {

        //this.openLoginModal(); 
        let modal = this.modalCtrl.create(RestModalPage, { markerInfo : markerInfo} );

        modal.onDidDismiss(data => {

        this.infoWindowOpen = !this.infoWindowOpen    
        });
        modal.present();
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


    }
