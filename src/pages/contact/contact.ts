import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FormControl, FormGroup } from '@angular/forms';
import { UserServiceProvider } from '../../providers/user-service/user-service';


@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})

export class ContactPage {
  /* userForm = new FormGroup({
    'name': new FormControl(),
    'email': new FormControl(),
    'phone' : new FormControl(),
    'area' : new FormControl()

  }); */
  constructor(
    public navCtrl: NavController,
    private userService : UserServiceProvider
    /* public user: User */
    ) {
      
  }
  public edit:boolean=false;
  public editSave: boolean=true;
  public user: any = this.userService.getUser();//make this of type user using a interface;
  userForm = new FormGroup({
    'name': new FormControl(),
    'email': new FormControl(),
    'phone' : new FormControl(),
    'area' : new FormControl()

  });
  
  

  ionViewWillEnter(){
    /* this.user = this.userService.getUser();
    //this.user = this.user[0];*/
    
    
    /* this.user = this.userService.getUser();
    this.userForm['name'].setValue(this.user[0].name); */
  }

  ionViewDidLoad() {
    
    //this.user = this.user[0];
    //this.userForm.controls['name'].setValue(this.user[0].name);
    this.userForm.controls['name'].setValue(this.user[0].name);
    this.userForm.controls['area'].setValue(this.user[0].areaName);
    this.userForm.controls['email'].setValue(this.user[0].email);
    this.userForm.controls['phone'].setValue(this.user[0].phone);
    
    
  }  


  toggleEditMode(){
    console.log(this.edit);
    this.edit = !this.edit;
    this.editSave = !this.editSave;
  }

  onSubmit(){

    this.userService.saveUser(this.userForm.value);
  }

}
