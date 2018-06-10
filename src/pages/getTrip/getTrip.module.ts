import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GetTripPage } from './getTrip';

@NgModule({
  declarations: [
    GetTripPage,
  ],
  imports: [
    IonicPageModule.forChild(GetTripPage),
  ],
})
export class GetTripPageModule {}
