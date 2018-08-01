import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FormControl, FormGroup } from '@angular/forms';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import { LoginRegisterProvider } from '../../providers/login-register/login-register';
import { LoginPage } from '../login/login';
import { HomePage } from '../home/home';


@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})

export class ContactPage {

  constructor(
    public navCtrl: NavController,
    private userService : UserServiceProvider,
    private loginRegisterService: LoginRegisterProvider
    /* public user: User */
    ) {
      console.log('contact consrtuctor fired');
      
  }

  public isEditing:boolean = false;
  public edit:boolean=false;
  public editSave: boolean=true;
  public user: any;
  userForm = new FormGroup({
    'name': new FormControl(),
    'email': new FormControl(),
    'phone' : new FormControl(),
    'area' : new FormControl()

  });

  ionViewWillEnter() {
    console.log('contact will enter fired');
    if(this.loginRegisterService._user){
      console.log('confirmaed user contact will enter')
      this.user = this.loginRegisterService._user;
      

    }else{
      console.log('cannot enter');
      this.navCtrl.push(LoginPage, {
        page : 'profilePage'
      });
      //return false;
    }  
  }
  
  
  
  ionViewDidEnter(){
    if(this.user){
      this.userForm.controls['name'].setValue(this.user.name);
      this.userForm.controls['area'].setValue(this.user.areaName);
      this.userForm.controls['email'].setValue(this.user.email);
      this.userForm.controls['phone'].setValue(this.user.phone); 
    }
  }

  cancel(){
    this.navCtrl.parent.select(0);
	}

  public editEmail(){
    alert('You cannot edit this right now');
  }

  public uploadPhoto(){
    alert('You cannot upload photos at this time');
  }

  public logout(){
    this.loginRegisterService.logout()
      .then((res)=>{
        console.log('logged out');
        this.loginRegisterService._user = null;
        this.navCtrl.parent.select(0);
      })
    
  }

  public saveUpdate(){
    console.log('save', this.userForm.value);

    this.userService.updateUser(this.userForm.value, this.user);

    this.toggleEditMode();
    alert('user has been updated');
  }

    


  toggleEditMode(){
    console.log(this.edit);
    this.edit = !this.edit;
    this.editSave = !this.editSave;
    this.isEditing = !this.isEditing;
  }



  onSubmit(){
console.log('wjeildf');
    /* this.userService.saveUser(this.userForm.value);*/
  } 

}
