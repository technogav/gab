import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RestModalPage } from './rest-modal';

@NgModule({
  declarations: [
    RestModalPage,
  ],
  imports: [
    IonicPageModule.forChild(RestModalPage),
  ],
})
export class RestModalPageModule {}
