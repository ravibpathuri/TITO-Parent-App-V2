import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AssessmentDetailsPage } from './assessment-details.page';

const routes: Routes = [
  {
    path: '',
    component: AssessmentDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AssessmentDetailsPageRoutingModule {}
