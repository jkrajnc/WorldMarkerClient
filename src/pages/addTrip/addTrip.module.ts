import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddTripPage } from './addTrip';

@NgModule({
  declarations: [
    AddTripPage,
  ],
  imports: [
    IonicPageModule.forChild(AddTripPage),
  ],
})
export class AddTripPageModule {}
