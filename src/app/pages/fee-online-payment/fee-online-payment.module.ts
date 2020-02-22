import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FeeOnlinePaymentPageRoutingModule } from './fee-online-payment-routing.module';

import { FeeOnlinePaymentPage } from './fee-online-payment.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FeeOnlinePaymentPageRoutingModule
  ],
  declarations: [FeeOnlinePaymentPage]
})
export class FeeOnlinePaymentPageModule {}
