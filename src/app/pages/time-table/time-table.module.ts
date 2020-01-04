import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { TimeTablePageRoutingModule } from "./time-table-routing.module";

import { TimeTablePage } from "./time-table.page";
import { SchedulerModule } from "@progress/kendo-angular-scheduler";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TimeTablePageRoutingModule,
    SchedulerModule
  ],
  declarations: [TimeTablePage]
})
export class TimeTablePageModule {}
