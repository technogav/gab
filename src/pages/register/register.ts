import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormControl } from '../../../node_modules/@angular/forms';
import * as firebase from 'firebase/app';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  auth =  firebase.auth();

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  loginForm: FormGroup = new FormGroup({
	  'email' : new FormControl,
	  'password' : new FormControl
  });

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  login() {

		let email = this.loginForm.value.email;
    let pass = this.loginForm.value.password;
    
    console.log('email',email);

		console.log(this.loginForm.value);
		let promise = this.auth.createUserWithEmailAndPassword(email, pass);
		promise.then((data) => {

      console.log(data.uid, ' : ',data.email );

    }).catch((e) => console.log(e.message));
	}

}
