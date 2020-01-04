import { Component, OnInit } from "@angular/core";

import { Storage } from "@ionic/storage";
import {
  SchedulerEvent,
  CreateFormGroupArgs,
  SchedulerComponent,
  NavigateEvent
} from "@progress/kendo-angular-scheduler";
import { sampleData, displayDate } from "./events-utc";
import {
  FormGroup,
  FormBuilder,
  Validators,
  ValidatorFn
} from "@angular/forms";
import { AnimationBuilder } from "@angular/animations";

@Component({
  selector: "time-table",
  templateUrl: "./time-table.page.html",
  styleUrls: ["./time-table.page.scss"]
})
export class TimeTablePage implements OnInit {
  public selectedDate: Date = displayDate;
  public events: SchedulerEvent[] = sampleData;
  public studentInfo: any = {};
  constructor(private storage: Storage) {}

  ngOnInit() {
    this.storage.get("currentUser").then(data => {
      if (data) {
        this.studentInfo = JSON.parse(data);
        console.log(this.studentInfo.Student);
      }
    });
  }

  public onNavigate(e: NavigateEvent): void {
    if (e.action.type === "focus-prev" || e.action.type === "focus-next") {
      // Prevent default navigation with arrow keys.
      e.preventDefault();
      console.log(e);
    }
  }
}
