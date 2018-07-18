//import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
//import { Observable } from 'rxjs';
import { Item } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { map } from "rxjs/operators";
/* import { User } from '../../models/userModal' */

/*
  Generated class for the UserServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.

  this service is for preparing data for upload to FB and for filtering and sorting data coming down from user
  it is also setting permissions for the user. (!note Do as much filtering as can be done on the FB servers)
  apis contacted will be firebase facebook google and whatever
*/
@Injectable()
export class UserServiceProvider{

  markerCollection$: Observable<Item[]>;
  
  markerDoc : AngularFirestoreDocument<Item>
  markerDoc$ : Observable<Item[]>;
  userCollection$ : Observable<Item[]>;
  snapshot: any;
  
  markerCollection: AngularFirestoreCollection<Item>;
  userCollection: AngularFirestoreCollection<Item>;

  todoCollectionRef: AngularFirestoreCollection<Item>;
  todo$: Observable<Item[]>;

  user: {} = {
    name: 'Gavin',
    areaName : 'Kilcullen',
    email : 'gavin_murphy1981@yahoo.ie',
    phone: '087 736 8998'
  };
  
  userDoc: AngularFirestoreDocument<{}>;
  userDoc$: Observable<Item[]>;
  testObs : Observable<void[]>;
  userDeals: Array<any> = [];
  userCollection$$: any;

  constructor(private afs: AngularFirestore) {
    const firestore = firebase.firestore();
    const settings = {/* your settings... */ timestampsInSnapshots: true};
    firestore.settings(settings);

    console.log('u ser');
    this.markerCollection = this.afs.collection('markers');
    //this.markerCollection$ = this.markerCollection.valueChanges();

    this.markerDoc = this.afs.doc('markers/bJmk3ikxWmFN481A1OCM');
    this.markerDoc$ = this.markerCollection.valueChanges();

    this.userCollection = this.afs.collection('users');
    this.userCollection$ = this.userCollection.valueChanges();

    this.userDoc = this.afs.doc('users/9smhOJNtC19sod8cAjb0');
    this.userDoc$ = this.userCollection.valueChanges();

    

    /* this.markerCollection.snapshotChanges()
      .pipe(map(arr => {
        console.log(33, arr);
        
        arr.map(snap => snap.payload.doc.data() )
        console.log(44, arr[0].payload.doc.id);
        return arr;
      })); */

      this.testObs = this.markerCollection.snapshotChanges().map(actions => {

        return actions.map(action => {
          /* console.log(action.payload.doc.id);
          console.log(action.payload.doc.data()); */

          let id = action.payload.doc.id;
          let data = action.payload.doc.data();

          console.log("****************");
          console.log({id , data});

          return {id , data};
        });
      }); 

      this.testObs.subscribe((test) => {
        console.log("test", test)
      })
  }

  getMarkers(){
    return this.markerCollection$;
  }

  getMarkerDoc(){


    return this.markerDoc;
  }

  getDocObs(){
    return this.markerDoc$;
  }

  getUser(){
    return this.userCollection;
  }

  getUserObs(){
    return this.userCollection$;
  }

  getUserDoc(){
    return this.userDoc;
  }

  saveUser(data){
    console.log("service", data);
  }

  reservation(data){
    console.log("service", data);
  }

}

/* this.markerCollection.add(
        {
          'id': 12345,
          'name': 'River Bank Theater',
          'desc': 'Riverbank Arts Centre hosts a programme of local, national and international productions including theatre, music, opera, comedy and visual arts. The venue comprises of a 180 seat auditorium, Children’s Gallery, McKenna Gallery, a contemporary gallery hosting both local national and international artists,  and a café. ',
          'lat': 53.18202979360638,
          'long': -6.79446068902007,
          'logoUrl' : '/assets/imgs/riverBank.jpg',
          'img' : '/assets/imgs/riverBank.jpg',
          'currentDeal' : {
              'id': 76543,
              'name' : 'Summer Madness',
              'dealDesc' : 'Admission for two plus two coffee's only $20',
              'numberAvailable' : 12,
              'numberTaken' : 2,
              'dateFrom' : '12/12/2018',
              'dateTo' : '14/12/2018',
              'timeFrom' : '09:00',
              'timeTo' : '15:00',
              'bookings' : [
                {
                  'userId' : 1,
                  'bookedDate' : '13/12/2018',
                  'bookedTime' : '12:00'
                }
              ]
            },
            'reviews' : [{}],
            'deals' : [{}],
            'area' : 'newbridge',
            'type' : 'entertainment',
            'foodType' : null
        }
      ); */

      /* this.userCollection.add({
      'name' : 'Kelly',
      'surname' : 'Murphy',
      'areaName' : 'Newbridge',
      'email' : 'kezod_06@hotmail.com',
      'phone' : '0871234567',
      'dateJoined' : '19/12/2012',
      'myDeals' : [],
      'favorites' : [],
      'reviews' : []
    }) */

   /*  */

   /* this.markerCollection.add(
    {
      'id': 54421,
      'name': 'Judge Roy Beans',
      'desc': 'Five big screens showing the top box office block busters. Enjoy the extra leg room we have added to all the seats along with some fresh popcorn and nachos.  ',
      'lat': 53.17744584885989,
      'long': -6.802374819719603,
      'logoUrl' : '/assets/imgs/jrb.png',
      'img' : '/assets/imgs/riverBank.jpg',
      'currentDeal' : {
          'id': 76543,
          'name' : 'Dinner for two 50% off',
          'dealDesc' : 'Two starters, two mains from selected menu and two soft drinks 50% off. Save up to $25!',
          'numberAvailable' : 10,
          'numberTaken' : 5,
          'dateFrom' : '18/07/2018',
          'dateTo' : '19/07/2018',
          'timeFrom' : '09:00',
          'timeTo' : '23:00',
          'bookings' : []
        },
        'reviews' : [],
        'deals' : [],
        'area' : 'newbridge',
        'type' : 'entertainment',
        'foodType' : null
    } 
  ); */

