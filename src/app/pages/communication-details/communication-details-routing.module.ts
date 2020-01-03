import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CommunicationDetailsPage } from './communication-details.page';

const routes: Routes = [
  {
    path: '',
    component: CommunicationDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CommunicationDetailsPageRoutingModule {}
