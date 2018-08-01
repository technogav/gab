import { Component, ElementRef, NgZone,  ViewChild } from '@angular/core';
import { AlertController, ModalController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { RestModalPage } from '../rest-modal/rest-modal';
import { } from 'googlemaps';
import { AgmCoreModule, MapsAPILoader } from '@agm/core';
import { FormControl } from "@angular/forms";
import { Geolocation } from '@ionic-native/geolocation';
import { FilterModalPage } from '../filter-modal/filter-modal';
import { LoginModalPage } from '../login-modal/login-modal';//if click rest details & logged 
import { UserServiceProvider } from '../../providers/user-service/user-service';

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
    //public rests= this.GeoService.getRests();
    public rests;
    public searchControl: FormControl;
    public zoom: number;
    public lat3: any;
    public long3: any;
    public icon = {
                url: '../../assets/imgs/locationDot.gif',
                    scaledSize: {
                    width:26,
                    height: 26
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
    markerId: string;
    private markerInit:boolean = false;
   
    constructor(
        public agm:AgmCoreModule,
        public alertCtrl: AlertController,
        public modalCtrl: ModalController,
        private geolocation: Geolocation,
        private mapsAPILoader: MapsAPILoader,
        private ngZone: NgZone,
        private userService : UserServiceProvider 
        ){    
        
        this.geolocation.getCurrentPosition()
            .then((resp) => {
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

    ngOnInit() {
        //set google maps defaults
        this.zoom = this.zoomLevel;
        //create search FormControl
        this.searchControl = new FormControl();
        
        //load Places Autocomplete
        this.mapsAPILoader.load()
            .then(() => {
                let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
                    types: ["geocode"] 
                });

                autocomplete.setComponentRestrictions({'country': ['ie']}
            );

                autocomplete.addListener("place_changed", () => {
                    this.ngZone.run(() => {
                    let place: google.maps.places.PlaceResult = autocomplete.getPlace();

                    //verify result
                    if (place.geometry === undefined || place.geometry === null) {
                        return;
                    }
                
                    this.mapCenterLat = place.geometry.location.lat();
                    this.mapCenterLng = place.geometry.location.lng();
                    this.zoom = 12;
                });
            });
        });
    }//ngOnit


    ionViewDidEnter(){
        
        this.rests = this.userService.getMarkers();

    }

    infoWindowOpening(){}

    getMarker(i){
        
        return {
            url: '../../assets/imgs/custom_marker_examp.png',
                scaledSize: {
                    width:40,
                    height: 40
                }
            }
    }

    //track drag center
    public trackCenter(event){
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

    public getMarkerInfo(item){ 
        this.markerInit = true;
        this.userService.setMarkerId(item.id)
        this.markerId = item.id;
        this.item = item;
        this.markerLat = item.data.lat;
        this.markerLong = item.data.long;
        this.markerOpen = true;
    }

    //close info
    public mapClick(){
        if(this.markerInit) this.markerOpen = !this.markerOpen;
    }

    //if not logged in open login modal
    public openLoginModal(){
        let modal = this.modalCtrl.create(LoginModalPage );

        modal.onDidDismiss(data => {
            //this.infoWindowOpen = !this.infoWindowOpen 
        });
        modal.present();
    }

    public returnToPosition(search){

    }

    public getCurrentPosition(search){
        this.geolocation.getCurrentPosition().then((resp) => {
        this.mapCenterLat = resp.coords.latitude;
        this.mapCenterLng = resp.coords.longitude;
        }).catch((error) => {
            console.log('Error getting location', error);
        });
    }

    public resetMap(){
        this.geolocation.getCurrentPosition()
            .then((resp) => { 
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
        let modal = this.modalCtrl.create(RestModalPage, { 
            markerInfo : markerInfo  
        });

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
