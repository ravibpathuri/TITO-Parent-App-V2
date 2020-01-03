import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AssessmentDetailsPageRoutingModule } from './assessment-details-routing.module';

import { AssessmentDetailsPage } from './assessment-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AssessmentDetailsPageRoutingModule
  ],
  declarations: [AssessmentDetailsPage]
})
export class AssessmentDetailsPageModule {}
