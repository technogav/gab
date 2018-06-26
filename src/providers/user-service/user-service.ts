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
  collection$: Observable<Item[]>;
  snapshot: any;
  
  collection: AngularFirestoreCollection<Item>;

  constructor(private afs: AngularFirestore) {
    console.log('Hello UserServiceProvider Provider');

    //get collection from db
    //const collection: AngularFirestoreCollection<Item> = afs.collection('messages');
    //const collection$: Observable<Item> = collection.valueChanges();
    //collection$.subscribe(data => console.log(data) );

    /* const meta = collection.snapshotChanges()
      .pipe(map(
          changes =>{
            return changes.map(c=>{
              console.log(c.payload.doc.id);
               return c.payload.doc.id;
            })
          })   
      ); */

     
  }

  ngOnInit() {
    console.log(123);
    this.collection = this.afs.collection('messages', ref =>{
      return ref.where('name', '==' , 'kelly').limit(1);
    });
    this.collection$ = this.collection.valueChanges();
    this.collection$.subscribe(data => console.log(data) );
    this.snapshot = this.collection.snapshotChanges()
      .pipe(map(arr => {
        console.log(arr);
        arr.map(snap => snap.payload.doc.data() )
      }));
  }

  ionViewDidLoad(){
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

  getUser(){
    return [{
      name: 'Gavin',
      areaName : 'Kilcullen',
      email : 'gavin_murphy1981@yahoo.ie',
      phone: '087 736 8998'
    }]
    //return true;
  }

  saveUser(data){
    console.log("service", data);
  }

  reservation(data){
    console.log("service", data);
  }

}
