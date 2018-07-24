import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormControl } from '../../../node_modules/@angular/forms';
import { LoginRegisterProvider } from '../../providers/login-register/login-register';
import { PersonalDetailsPage } from '../personal-details/personal-details';


@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  //vars
    public loginForm: FormGroup = new FormGroup({
      'email' : new FormControl,
      'password' : new FormControl
    });

  //constructor and lifecycle hooks
    constructor(
      public navCtrl: NavController, 
      public navParams: NavParams,
      public loginRegisterService : LoginRegisterProvider) {
    }

  ionViewDidLoad(){

    
  }

  //functions
    register() {
      let email = this.loginForm.value.email;
      let password = this.loginForm.value.password;
      this.loginRegisterService.createUser(email, password)
      .then((data)=>{

        console.log('funbags', data.uid);

        this.navCtrl.push(PersonalDetailsPage, {
          'uid': data.uid,
          'email': data.email 
        });
      })
    }


}
