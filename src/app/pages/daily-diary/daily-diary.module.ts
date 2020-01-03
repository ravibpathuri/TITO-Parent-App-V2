import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { DailyDiaryPageRoutingModule } from "./daily-diary-routing.module";

import { DailyDiaryPage } from "./daily-diary.page";
import { PipesModule } from "../../pipes/pipes.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DailyDiaryPageRoutingModule,
    PipesModule
  ],
  declarations: [DailyDiaryPage]
})
export class DailyDiaryPageModule {}
