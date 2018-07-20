import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';


/*
  Generated class for the LoginRegisterProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LoginRegisterProvider {

  auth =  firebase.auth();

  constructor(public http: HttpClient) {
    console.log('Hello LoginRegisterProvider Provider');
  }

  public createUser(email, password){
    let promise = this.auth.createUserWithEmailAndPassword(email, password);

		return promise/* .then((data) => {

      this.createUserData();
     
      console.log('success throuigh service', data.uid, ' : ',data.email );
      
    }).catch((e) => console.log(e.message)) */; 
    
  }


  public createUserData(){


     /* this.userCollection.add({
      
    }) */
  }

  


}
