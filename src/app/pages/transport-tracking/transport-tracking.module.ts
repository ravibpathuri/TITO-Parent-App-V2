import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TransportTrackingPageRoutingModule } from './transport-tracking-routing.module';

import { TransportTrackingPage } from './transport-tracking.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TransportTrackingPageRoutingModule
  ],
  declarations: [TransportTrackingPage]
})
export class TransportTrackingPageModule {}
