import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CommunicationDetailsPageRoutingModule } from './communication-details-routing.module';

import { CommunicationDetailsPage } from './communication-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CommunicationDetailsPageRoutingModule
  ],
  declarations: [CommunicationDetailsPage]
})
export class CommunicationDetailsPageModule {}
