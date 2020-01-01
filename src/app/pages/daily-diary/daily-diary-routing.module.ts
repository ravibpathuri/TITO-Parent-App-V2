import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DailyDiaryPage } from './daily-diary.page';

const routes: Routes = [
  {
    path: '',
    component: DailyDiaryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DailyDiaryPageRoutingModule {}
