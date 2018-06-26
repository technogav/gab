import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { FormControl, FormGroup } from '@angular/forms';
import { UserServiceProvider } from '../../providers/user-service/user-service';


@Component({
  selector: 'page-reservations',
  templateUrl: 'reservations.html'
})


export class ReservationsArchivedPage {


  userForm = new FormGroup({
    'name': new FormControl(),
    'email': new FormControl(),
    'phone' : new FormControl(),
    'area' : new FormControl()
    

  });

  
  constructor(
    public navCtrl: NavController,
    private userService : UserServiceProvider,
    public alertCtrl : AlertController
    /* public user: User */
    ) {

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


  
  onSubmit(){

    this.userService.saveUser(this.userForm.value);
  }

  

}
