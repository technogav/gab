import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormControl } from '../../../node_modules/@angular/forms';
import { LoginRegisterProvider } from '../../providers/login-register/login-register';
import { LoginPage } from '../login/login';

@IonicPage()
@Component({
  selector: 'page-personal-details',
  templateUrl: 'personal-details.html',
})
export class PersonalDetailsPage {
  uid: any;
  registerDetailsForm: FormGroup = new FormGroup({
	  'name' : new FormControl,
    'surname' : new FormControl,
    'email' : new FormControl,
    'phone' : new FormControl,
    'dob' : new FormControl
    
  });
  email: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private loginRegisterService: LoginRegisterProvider
    /* public user : User */) {
      console.log('personalDets', this.navParams.get('uid'));
      this.uid = this.navParams.get('uid');
      this.email = this.navParams.get('email');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PersonalDetailsPage');
  }

  public registerDetails(){
    console.log( this.registerDetailsForm.value.name );

    let name;
    let email;
    let dob;
    let phone;

    this.sendLoginRegisterService();
  }

  private sendLoginRegisterService(){
    this.loginRegisterService.registerUserDetails(this.uid, this.registerDetailsForm.value);
  }

  public registerDetailsNow(){
    this.alert('should redirect 1');
    this.redirectBackToLogin();
  }

  public redirectBackToLogin(param?){
    this.navCtrl.remove(2,1)
    this.navCtrl.pop();  
  }

  public registerDetailsLater(){
    let str = 'Warning, you must complete your details registration the next time you log in. Our partners require a validation of any reservations made.'
    this.alert(str);
    this.alert('should rediret 2');
    this.redirectBackToLogin();
  }

  private alert(str){
    alert(str);
  }

}
