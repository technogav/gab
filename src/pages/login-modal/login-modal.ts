import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ViewController } from 'ionic-angular';
import { FormControl, FormGroup } from '@angular/forms';
import { UserServiceProvider } from '../../providers/user-service/user-service';


/**
 * Generated class for the LoginModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login-modal',
  templateUrl: 'login-modal.html',
})



export class LoginModalPage {

  loginForm = new FormGroup({
    'name': new FormControl(),
    'password': new FormControl()
    
  });

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public viewCtrl:ViewController,
    private userService : UserServiceProvider,
    public modalCtrl : ModalController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginModalPage');
  }

  /* onSubmit(){

    this.userService.saveUser(this.loginForm.value);
    this.continueToBooking();
  } */

  /* continueToBooking() {

    let modal = this.modalCtrl.create(BookingModalPage);

    modal.onDidDismiss(data => {
      
    });
 
    modal.present();


  }*/

  dismiss(bool) {
    //let data = { 'foo': 'bar' };
    this.viewCtrl.dismiss(bool);
  } 

}
