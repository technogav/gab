import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/mergeMap';
import { Item } from '../../../node_modules/ionic-angular/umd';


@Injectable()
export class LoginRegisterProvider {

  auth =  firebase.auth();
  /* markerCollection$: Observable<Item[]>;
  markerDoc : AngularFirestoreDocument<any> */
  userCollection$ : Observable<Item[]>;
  markerCollection: AngularFirestoreCollection<Item>;
  userCollection: AngularFirestoreCollection<Item>;
  /* userDoc: AngularFirestoreDocument<{}>;
  userDoc$: Observable<{}>; */
  /* testObs : Observable<any[]>; */
  /* userDeals: Array<any> = []; */
  private _markerId: string;
  user: Item;
  _user: firebase.firestore.DocumentData = null;

  constructor(
    public http: HttpClient,
    private afs: AngularFirestore) {

    //console.log('Hello LoginRegisterProvider Provider');
    const firestore = firebase.firestore();
    const settings = {/* your settings... */ timestampsInSnapshots: true};
    firestore.settings(settings);

    this.userCollection = this.afs.collection('users')
    this.auth.onAuthStateChanged((user)=>{
      if(user){
        console.log('yes user');
        this.setUser(user.uid);     
      }else{
        console.log('no user');
      }
    })
  }

  public createUser(email, password){
    let promise = this.auth.createUserWithEmailAndPassword(email, password);
		return promise
  }

  public login(email, password){
    let promise = this.auth.signInWithEmailAndPassword(email, password);
      promise.then((data)=>{ 
        if (data.uid){ 
          this.setUser(data.uid);
        }
      })
    .catch((e)=>{
      console.log(e.message);
      alert(e.message);
    }) 
  }

  public logout(){
    firebase.auth().signOut().then(() => {
      console.log('signed out');
      this._user = null;
    })
    .catch((e)=> console.log(e.message));
  }

  setUser(id:string){

    if(!id){console.log('uid not sent to setUser()'); return;}

    var docRef = this.afs.collection("users").doc(id);
    docRef.ref.get().then((data)=>{
      if(data.exists){
        console.log('doc exists');
        this._user = data.data();
        this._user['uid'] = id;
      }else{
        return;
      } 
    })
  }

  getUser(){
    return this._user;
  }

  public registerUserDetails(id, data){
    //console.log('registerUserDetails');

    this.userCollection.doc(id).set({
      'name' : data.name,
      'surname' : data.surname,
      'areaName' : 'Newbridge',
      'email' : data.email,
      'phone' : '0871234567',
      'dateJoined' : '19/12/2012',
      'myDeals' : [],
      'favorites' : [],
      'reviews' : []
    }); 
  }
}
