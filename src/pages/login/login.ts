import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
//import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { HomePage } from '../home/home';
import * as firebase from 'firebase/app';
import { RegisterPage } from '../register/register';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

	auth =  firebase.auth();	

  loginForm: FormGroup = new FormGroup({
	  'email' : new FormControl,
	  'password' : new FormControl
  });
	loginError: string;

	constructor(
		private navCtrl: NavController,
		private formBuilder: FormBuilder
	) {}

	goRegister(){
		this.navCtrl.push(RegisterPage);
	}	
  login() {

		let email = this.loginForm.value.email;
		let pass = this.loginForm.value.password

		console.log(this.loginForm.value);
		let promise = this.auth.signInWithEmailAndPassword(email, pass);
		promise.catch((e) => console.log(e.message));
	}



}
