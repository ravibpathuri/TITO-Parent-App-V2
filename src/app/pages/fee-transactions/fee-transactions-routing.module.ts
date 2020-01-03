import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FeeTransactionsPage } from './fee-transactions.page';

const routes: Routes = [
  {
    path: '',
    component: FeeTransactionsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FeeTransactionsPageRoutingModule {}
