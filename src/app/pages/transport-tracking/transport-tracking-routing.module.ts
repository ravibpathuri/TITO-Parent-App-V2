import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TransportTrackingPage } from './transport-tracking.page';

const routes: Routes = [
  {
    path: '',
    component: TransportTrackingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TransportTrackingPageRoutingModule {}
