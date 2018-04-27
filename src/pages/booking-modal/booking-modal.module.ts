import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BookingModalPage } from './booking-modal';

@NgModule({
  declarations: [
    BookingModalPage,
  ],
  imports: [
    IonicPageModule.forChild(BookingModalPage),
  ],
})
export class BookingModalPageModule {}
