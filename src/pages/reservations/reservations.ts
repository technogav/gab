import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { FormControl, FormGroup } from '@angular/forms';
import { UserServiceProvider } from '../../providers/user-service/user-service';
//import { ReservationsArchivedPage } from '../../pages/reservations-archived/reservations-archived'

@Component({
  selector: 'page-reservations',
  templateUrl: 'reservations.html'
})


export class ReservationsPage {
  
  userForm = new FormGroup({
    'name': new FormControl(),
    'email': new FormControl(),
    'phone' : new FormControl(),
    'area' : new FormControl()
  });
  userData: any;
  userDeals: any;
  user: any;
  myDeals: Array<any>;
  today: Date;
  showArchived: boolean = true;

  constructor(
    public navCtrl: NavController,
    private userService : UserServiceProvider,
    public alertCtrl : AlertController
    /* public user: User */
    ) {
      this.userData = this.userService.getUserObs();
      this.today = new Date();
      console.log("today", this.today);
      
      this.userData.subscribe((data)=>{
        console.log("this", data[0].myDeals);
        console.log(data[0].myDeals);
        this.myDeals = data[0].myDeals;
        console.log(this.myDeals[2].bookedDate)
      })

  }

  unsubscribe(){
    this.userData.unsubscribe();
  }

  ionViewDidLeave(){

  }

  showAlert(message?) {

    if(message){
      if(message === 'call'){
        let alert = this.alertCtrl.create({
          title: 'Call',
          subTitle: "Use contacts to call restaurant",
          buttons: ['OK']
        });
        alert.present();
      }
    }else{
      let alert = this.alertCtrl.create({
        title: 'Offline!',
        subTitle: "Ooop's you have lost connectivity",
        buttons: ['OK']
      });
      alert.present();
    }  
  }

  public ratePlace(){
    let alert = this.alertCtrl.create({
      title: 'Offline!',
      subTitle: "Rating Feature coming soon. (to help with AI suggestions)",
      buttons: ['OK']
    });
    alert.present();
  }
 
  public onSubmit(){
    this.userService.saveUser(this.userForm.value);
  }

  

}
