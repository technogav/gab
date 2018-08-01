import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ViewController, AlertController } from 'ionic-angular';
import { FormControl, FormGroup } from '@angular/forms';
import { UserServiceProvider } from '../../providers/user-service/user-service';

@Component({
  selector: 'page-filter-modal',
  templateUrl: 'filter-modal.html',
})
export class FilterModalPage {

  filterSearchForm = new FormGroup({
    'searchByDate': new FormControl(),
    'searchByRestaurant': new FormControl(),
    'searchByLocation': new FormControl(),
    'searchByCuizine': new FormControl()
  });

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public modalCtrl:ModalController, 
    public viewCtrl:ViewController,
    public alertCtrl : AlertController,
    public userService: UserServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RestModalPage');
  }

  dismiss(bool) {
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

  public filterList(){
    //open modal with list
  }

  public filterSearch(){
    //either open modal for fail or show map
  }

  onSubmit(){
    this.userService.reservation(this.filterSearchForm.value);
  }


  reserve() {

    /* let modal = this.modalCtrl.create(BookingModalPage,{
      'date' : this.filterSearchForm.value.date,
      'time' : this.reservationForm.value.time
    }); */

    /* modal.onDidDismiss(data => {
      console.log("here", data);
      data?  this.dismiss(data) : console.log('onDidDismiss sent',  data);
    }); */
 
    /* modal.present(); */


  }

  

}
