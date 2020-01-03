import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FeeTransactionsPageRoutingModule } from './fee-transactions-routing.module';

import { FeeTransactionsPage } from './fee-transactions.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FeeTransactionsPageRoutingModule
  ],
  declarations: [FeeTransactionsPage]
})
export class FeeTransactionsPageModule {}
