import { Component, OnInit } from "@angular/core";
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
  styles: [
    "node_modules/@progress/kendo-theme-bootstrap/dist/all.css",
    "node_modules/bootstrap/dist/css/bootstrap.min.css"
  ]
})
export class TimeTablePage implements OnInit {
  public selectedDate: Date = displayDate;
  public events: SchedulerEvent[] = sampleData;
  constructor() {}

  ngOnInit() {}

  public onNavigate(e: NavigateEvent): void {
    if (e.action.type === "focus-prev" || e.action.type === "focus-next") {
      // Prevent default navigation with arrow keys.
      e.preventDefault();
      console.log(e);
    }
  }
}
