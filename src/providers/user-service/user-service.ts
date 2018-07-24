
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Item } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UserServiceProvider{

  markerCollection$: Observable<Item[]>;
  markerDoc : AngularFirestoreDocument<any>
  markerDoc$ : Observable<Item[]>;
  userCollection$ : Observable<Item[]>;
  markerCollection: AngularFirestoreCollection<Item>;
  userCollection: AngularFirestoreCollection<Item>;
  userDoc: AngularFirestoreDocument<{}>;
  userDoc$: Observable<{}>;

  testObs : Observable<any[]>;
  userDeals: Array<any> = [];
  userCollection$$: any;
  private _markerId: string;
  user: Item;

  constructor(private afs: AngularFirestore) {
    console.log('************************************* user service************')
    const firestore = firebase.firestore();
    const settings = {/* your settings... */ timestampsInSnapshots: true};
    firestore.settings(settings);

    this.markerCollection = this.afs.collection('markers');
    this.markerCollection$ = this.markerCollection.valueChanges();

    this.userCollection = this.afs.collection('users');
    this.userCollection$ = this.userCollection.valueChanges();

      //get marker object with ids and data
      this.testObs = this.markerCollection.snapshotChanges().map(actions => {
        return actions.map(action => {
          let id = action.payload.doc.id;
          let data = action.payload.doc.data() as Item;
          return {id , data};
        });
      });
 
  }

  setMarkerRef(markerInfo, date, time, user){
console.log(1, 'A', user);

//get the uid her now!!!!!!!!!!!!!!!!!!!!!!!


      this.markerDoc = this.afs.doc('markers/' + markerInfo.id);
      this.markerDoc$ = this.markerCollection.valueChanges();

      this.userDoc = this.afs.collection("users").doc(user.uid);
      
      let numberAvailable = markerInfo.data.currentDeal.numberAvailable; 
      let numberTaken = markerInfo.data.currentDeal.numberTaken;
      let currentDeal = markerInfo.data.currentDeal;

      if (numberTaken < numberAvailable){
            numberTaken = numberTaken + 1;
            if(user){
              console.log(2, user.name);
              if (user['myDeals'].length > 4){
                user['myDeals'].shift();
              }

            console.log(3, user.myDeals);

            user['myDeals'].push({
              dealDesc : markerInfo.data.currentDeal.dealDesc ,
              dealId : markerInfo.data.currentDeal.id,
              dealName : markerInfo.data.currentDeal.name,
              dealTimeStart : markerInfo.data.currentDeal.timeFrom,
              dealTimeEnd : markerInfo.data.currentDeal.timeTo,
              description: markerInfo.data.desc,
              id : markerInfo.data.id,
              img :  markerInfo.data.img,
              logoUrl : markerInfo.data.logoUrl,
              lat: markerInfo.data.lat,
              lng : markerInfo.data.long,
              phone : '001011',
              bookedDate: date,
              timeBooked: time,
              placeName: markerInfo.data.name,
              area : markerInfo.data.area 
            });

            if (currentDeal.bookings.length > 4){
                  currentDeal.bookings.shift();
            }

            currentDeal.bookings.push({
              name: user['name'] + ' ' + user['surname'],
              phone: user['phone'],
              email: user['email'],
              dateBooked: date,
              timeBooked: time
            });

          this.userDoc.update({
            'myDeals' : user['myDeals']
          });

          this.markerDoc.update({
            'currentDeal.numberTaken' : numberTaken,
            'currentDeal.bookings' : currentDeal.bookings  
          });

        }else{
          alert("this.user is undefined");
        }
      }else{
        //delete currentDeal
        //this.currentDeal
        //push currentdeal to deals with timestamp and tracking tag (obj)
        //this.currentDeal.push()
  
        /* this.markerDoc.update({
          'currentDeal.numberTaken' : 10
        }); */
  
        //this.deals.push(this.markerInfo);
       /*  this.markerDoc.update({
          'myDeals' : this.deals,
          'currentDeal.numberTaken' : 8
        }); 
        alert("this is the last deal.")
        return;
      } */
      /* this.user['dealsAquired'].push(this.markerInfo); */
      //this.markerInfo.bookings.push(this.user)
  
    }
  }

  public setMarkerId(id){

    this._markerId = id;
    //this.getMarkerRef(id);

  }

  getMarkers(){
    return this.testObs;
    //return this.markerCollection$;
  }

  getMarkerDoc(){
    return this.markerDoc;
  }

  getDocObs(){//rubbish
    console.log(this.markerDoc$);
    return this.markerDoc$; 
  }

  getUser(){
    return this.user;
    //return this.userCollection;
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

