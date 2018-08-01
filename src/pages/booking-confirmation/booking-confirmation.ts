import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController } from 'ionic-angular';

@Component({
  selector: 'page-booking-confirmation',
  templateUrl: 'booking-confirmation.html',
})
export class BookingConfirmationPage {

  isBooked:boolean =true;
  markerInfo : {} = this.params.get('markerInfo');
  user : {} = this.params.get('user');
  /* bookingDate: string = this.params.get('date');
  bookingTime: string = this.params.get('time'); */

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public viewCtrl: ViewController,
    public alertCtrl: AlertController,
    public params: NavParams) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BookingModalPage');
  }
  

  dismiss(bool) {
    console.log(1, bool);
    //let data = { 'foo': 'bar' };
    this.viewCtrl.dismiss(bool);
  }

  public showAlert() {
    let alert = this.alertCtrl.create({
      title: 'Coming Soon',
      subTitle: "This feature is not available yet",
      buttons: ['OK']
    });


    alert.present();
  }

}
