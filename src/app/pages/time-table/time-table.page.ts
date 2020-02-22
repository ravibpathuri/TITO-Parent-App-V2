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
import { StudentSvcProvider } from "../../providers/providers";

@Component({
  selector: "time-table",
  templateUrl: "./time-table.page.html",
  styleUrls: ["./time-table.page.scss"]
})
export class TimeTablePage implements OnInit {
  public selectedDate: Date = new Date();
  public events: SchedulerEvent[];
  public studentInfo: any = {};
  public baseData;

  constructor(
    private storage: Storage,
    public profileSvc: StudentSvcProvider
  ) {}

  ngOnInit() {
    this.storage.get("currentUser").then(data => {
      if (data) {
        this.studentInfo = JSON.parse(data);
        console.log(this.studentInfo.Student);
      }
    });

    this.profileSvc.getTimeTable().subscribe(result => {
      this.baseData = result;

      this.events = this.baseData.map(
        dataItem =>
          <SchedulerEvent>{
            id: dataItem.TaskID,
            start: this.parseAdjust(dataItem.Start),
            startTimezone: dataItem.startTimezone,
            end: this.parseAdjust(dataItem.End),
            endTimezone: dataItem.endTimezone,
            isAllDay: dataItem.IsAllDay,
            title: dataItem.Title,
            description: dataItem.Description,
            recurrenceRule: dataItem.RecurrenceRule,
            recurrenceId: dataItem.RecurrenceID,
            recurrenceException: dataItem.RecurrenceException,

            roomId: dataItem.RoomID,
            ownerID: dataItem.OwnerID
          }
      );

      console.log(this.events);
    });
  }

  public onNavigate(e: NavigateEvent): void {
    if (e.action.type === "focus-prev" || e.action.type === "focus-next") {
      // Prevent default navigation with arrow keys.
      e.preventDefault();
      console.log(e);
    }
  }

  parseAdjust(eventDate: string): Date {
    const date = new Date(eventDate);
    date.setFullYear(new Date().getFullYear());
    return date;
  }
}
