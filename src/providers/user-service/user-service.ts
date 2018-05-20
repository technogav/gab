//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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
export class UserServiceProvider {

  private user;

  constructor(/* public http: HttpClient */) {
    console.log('Hello UserServiceProvider Provider');
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
