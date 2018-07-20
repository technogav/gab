import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from '../../models/userModal';
import { FormGroup, FormControl } from '../../../node_modules/@angular/forms';

@IonicPage()
@Component({
  selector: 'page-personal-details',
  templateUrl: 'personal-details.html',
})
export class PersonalDetailsPage {
  uid: any;
  loginForm: FormGroup = new FormGroup({
	  'name' : new FormControl,
    'surname' : new FormControl,
    'email' : new FormControl,
    
  });
  email: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    /* public user : User */) {
      /* const email = this.navParams.get('email');
      const password = this.navParams.get('pass'); */
      console.log(this.navParams.get('uid'));
      this.email = this.navParams.get('email');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PersonalDetailsPage');
  }

}
