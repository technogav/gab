import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController, NavParams } from 'ionic-angular';
import { FormGroup,  FormControl } from '@angular/forms';
import * as firebase from 'firebase/app';
import { RegisterPage } from '../register/register';
import { LoginRegisterProvider } from '../../providers/login-register/login-register';
import { HomePage } from '../home/home';
import { ReservationsPage } from '../reservations/reservations';

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
fromPage: string;

	constructor(
		private navCtrl: NavController,
		private loginRegesterService: LoginRegisterProvider,
		private alertCtrl: AlertController,
		private navParams: NavParams
	) {
		this.fromPage = this.navParams.get('page');
	}

	ionViewWillEnter(){
		this.user = this.loginRegesterService.getUser();	
	}	

	ionViewDidEnter(){
		this.checkIfLoggedIn();	
	}

	public goRegister(){
		this.navCtrl.push(RegisterPage);
	}
	
	private createAlert(message){
		let alert = this.alertCtrl.create({
			title: 'Alert',
			subTitle: message,
			buttons: ['Dismiss']
		  });
		alert.present();
	}

  	public login() {
		if(!this.validateInput()) return;
		let email = this.loginForm.value.email;
		let pass = this.loginForm.value.password;
		this.loginRegesterService.login(email, pass)
			.then((res)=>{
				this.loginRegesterService.setUser(res.uid);
				this.createAlert('Logged in Successfully');
				
			})
			.catch((e)=>{
				alert(e.message);
			});
	}

	public validateInput(input?){
		var bool: boolean = true;
		if(this.loginForm.value[input].length < 6){
			this.createAlert('Invalid ' + input);
			bool = false;	
		}
		return bool;
	}

	private revertToRoot(){
		let user = this.loginRegesterService.getUser();
		if(user){
			if(this.fromPage === 'profilePage'){
				this.navCtrl.parent.select(2);
			}else if(this.fromPage === 'reservationsPage'){
				this.navCtrl.parent.select(1);
			}
		}else{
			this.navCtrl.parent.select(0);
		}	
	}

	public cancel(){
		this.loginForm.value.email = '';
		this.loginForm.value.password = '';
		this.revertToRoot();
	}

	private checkIfLoggedIn(){
		if(this.user){
			this.revertToRoot();
		}
	}

	
}
