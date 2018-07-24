import { Component } from '@angular/core';
import { IonicPage, NavController,  } from 'ionic-angular';
import { FormGroup,  FormControl } from '@angular/forms';
import * as firebase from 'firebase/app';
import { RegisterPage } from '../register/register';
import { LoginRegisterProvider } from '../../providers/login-register/login-register';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

auth =  firebase.auth();
user: any;	

loginForm: FormGroup = new FormGroup({
	'email' : new FormControl,
	'password' : new FormControl
});
loginError: string;

	constructor(
		private navCtrl: NavController,
		private loginRegesterService: LoginRegisterProvider
	) {
		this.user = loginRegesterService.getUser();//null
		
	}

	goRegister(){
		this.navCtrl.push(RegisterPage);
	}	
  login() {

		let email = this.loginForm.value.email;
		let pass = this.loginForm.value.password;

		this.loginRegesterService.login(email, pass);
		this.navCtrl.pop();
			/* .then((res)=> console.log(res))
			.catch((e) => {
				console.log(e.message);
				alert('no user with this email address')
			}) */
		
		
	}

	logout(){
		
		this.loginRegesterService.logout();
	}
}
