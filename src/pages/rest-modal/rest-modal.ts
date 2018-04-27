import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ViewController } from 'ionic-angular';
import { BookingModalPage } from '../booking-modal/booking-modal';

/**
 * Generated class for the RestModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-rest-modal',
  templateUrl: 'rest-modal.html',
})
export class RestModalPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    public modalCtrl:ModalController, public viewCtrl:ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RestModalPage');
  }

  dismiss() {
    //let data = { 'foo': 'bar' };
    this.viewCtrl.dismiss();
  }

  reserve() {
    console.log("helloo")

    let modal = this.modalCtrl.create(BookingModalPage);
    modal.present();
  }

}
