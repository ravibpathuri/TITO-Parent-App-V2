import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TransportDetailsPageRoutingModule } from './transport-details-routing.module';

import { TransportDetailsPage } from './transport-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TransportDetailsPageRoutingModule
  ],
  declarations: [TransportDetailsPage]
})
export class TransportDetailsPageModule {}
