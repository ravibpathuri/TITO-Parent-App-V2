import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TransportDetailsPage } from './transport-details.page';

const routes: Routes = [
  {
    path: '',
    component: TransportDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TransportDetailsPageRoutingModule {}
