import { Component, OnInit } from "@angular/core";
import { AddStudentForm } from "../../interfaces/user-options";
import { FCM } from "@ionic-native/fcm/ngx";
import { Platform } from "@ionic/angular";
import { StudentSvcProvider } from "../../providers/providers";
import { Router } from "@angular/router";
import { Toast } from "@ionic-native/toast/ngx";
import { Storage } from "@ionic/storage";
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
  ValidatorFn,
  AbstractControl,
  ReactiveFormsModule,
  FormsModule
} from "@angular/forms";

@Component({
  selector: "add-student",
  templateUrl: "./add-student.page.html",
  styleUrls: ["./add-student.page.scss"]
})
export class AddStudentPage implements OnInit {
  _user: any;

  account: AddStudentForm = {
    ParentLoginId: "",
    Password: "",
    GroupCode: "",
    MACAddress: ""
  };
  uuid = "fakeuuid";
  accountFG;

  private loginErrorString: string;

  NOTIFICATIONTOPICS = "MY_NOTIFICATION_TOPICS";
  STORED_USER = "_newUser";
  USER_STORAGE_NAME = "currentUser";
  ALL_USERS_STORAGE_NAME = "allUsers";

  backend: any;

  constructor(
    public fb: FormBuilder,
    public router: Router,
    private fcm: FCM,
    private platform: Platform,
    public storage: Storage,
    private toast: Toast,
    public studentSvc: StudentSvcProvider
  ) {}

  ngOnInit() {
    this.accountFG = this.fb.group({
      ParentLoginId: ["", [Validators.required]],
      Password: ["", Validators.required],
      MACAddress: [this.uuid]
    });
  }

  doLogin() {
    this.account = this.accountFG.value;
    // To do Groupcode='CRAYONS'
    this.account.GroupCode = "TITO";
    if (!this.accountFG.valid) {
      console.log(`Form Not Valid`);
      this.toast.show(`Invalid Details`, "3000", "top").subscribe(toast => {
        console.log(toast);
      });
      return;
    } else {
      this.studentSvc.addUser(this.account).subscribe(
        (result: any) => {
          this.saveUser(result);
          // load Firebase Console Mnager
          if (this.platform.is("android")) {
            this.loadFCM();
          }
          console.log(result);
          //this.router.navigateByUrl("/app/tabs/profile");
          this.router.navigateByUrl("/users-list");
        },
        err => {
          console.log("Invalid Details");
          this.toast.show(`Invalid Details`, "3000", "top").subscribe(toast => {
            console.log(toast);
          });
        }
      );
    }
  }

  saveUser(response) {
    this._user = response;
    console.log(this._user);
    this.storage.set(this.USER_STORAGE_NAME, JSON.stringify(this._user));
    this.storage.get(this.ALL_USERS_STORAGE_NAME).then(allUsers => {
      let allUsersJSON = [];
      if (allUsers) {
        allUsersJSON = JSON.parse(allUsers);
      }
      allUsersJSON.push(this._user);
      this.storage.set(
        this.ALL_USERS_STORAGE_NAME,
        JSON.stringify(allUsersJSON)
      );
      //this.router.navigateByUrl("/users-list");
    });
  }

  loadFCM() {
    //   // get topics from api and suscribe
    //   this.studentSvc.getNotificationTopics().subscribe((topics: any) => {
    //     this.storage.set(this.NOTIFICATIONTOPICS, JSON.stringify(topics));
    //     // subscribe to each topic
    //     topics.forEach(topicName => {
    //       this.fcm.subscribeToTopic(topicName);
    //     });
    //   });
    //   // when notification is received
    //   this.fcm.onNotification().subscribe(data => {
    //     if (data.wasTapped) {
    //       this.router.navigateByUrl("/notification");
    //     } else {
    //     }
    //   });
  }
}
