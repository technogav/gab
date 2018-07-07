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
export class UserServiceProvider implements OnInit{

  document: AngularFirestoreDocument<any>;
  markerCollection$: Observable<Item[]>;
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
  todo: Observable<void[]>;

  constructor(private afs: AngularFirestore) {
    const firestore = firebase.firestore();
    const settings = {/* your settings... */ timestampsInSnapshots: true};
    firestore.settings(settings);
    console.log("service");

    /* this.todoCollectionRef = this.afs.collection<Item>('users');
    this.todo = this.todoCollectionRef.snapshotChanges().map(actions => {
      console.log('jsdklfjos');
      return actions.map(action => {
        const data = action.payload.doc.data() as Item;
        const id = action.payload.doc.id;
        return { id, ...data };
        console.log('action.payload.doc.id');
      });
    }); */
    
   

    this.markerCollection = this.afs.collection('markers');
    this.markerCollection$ = this.markerCollection.valueChanges();

    this.userCollection = this.afs.collection('users');
    this.userCollection$ = this.userCollection.valueChanges();

   /*  this.userCollection.add({
      'name' : 'Gavin',
      'surname' : 'Murphy',
      'areaName' : 'Newbridge',
      'email' : 'gavin@bigbang.ie',
      'phone' : '0871234567',
      'dateJoined' : '12/12/2009',
      'myDeals' : [],
      'favorites' : [],
      'reviews' : []
    }) */

    this.markerCollection.snapshotChanges()
      .pipe(map(arr => {
        console.log(33, arr);
        
        arr.map(snap => snap.payload.doc.data() )
        console.log(44, arr[0].payload.doc.id);
        return arr;
      }));

      /* this.markerCollection.snapshotChanges().map(actions => {
        console.log("A");
        return actions.map(action => {
          
          console.log("jkl");
        });
      }); */
     
  }

  ngOnInit() {
    /* console.log(123);
    this.collection = this.afs.collection('messages', ref =>{
      return ref.where('name', '==' , 'kelly').limit(1);
    });
    this.collection$ = this.collection.valueChanges();
    this.collection$.subscribe(data => console.log(data) );
    this.snapshot = this.collection.snapshotChanges()
      .pipe(map(arr => {
        console.log(arr);
        arr.map(snap => snap.payload.doc.data() )
      })); */
  }

  getMarkers(){
    return this.markerCollection$;
  }

  getUser(){
    return this.userCollection$;
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
