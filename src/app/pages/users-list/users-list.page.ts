import { Component, OnInit } from "@angular/core";
import { Storage } from "@ionic/storage";
import { Router } from "@angular/router";

@Component({
  selector: "users-list",
  templateUrl: "./users-list.page.html",
  styleUrls: ["./users-list.page.scss"]
})
export class UsersListPage implements OnInit {
  Users: any = {};
  allUsers = [];
  details: any = {};

  USER_STORAGE_NAME = "currentUser";
  ALL_USERS_STORAGE_NAME = "allUsers";

  constructor(public storage: Storage, public router: Router) {}

  ngOnInit() {}

  ionViewDidEnter() {
    console.log("ionViewDidEnter UsersListPage");

    this.storage.get(this.ALL_USERS_STORAGE_NAME).then(data => {
      if (data) {
        this.allUsers = JSON.parse(data);
        if (this.allUsers.length <= 0) {
          this.router.navigateByUrl("/app/tabs/profile");
        }
      } else {
        this.router.navigateByUrl("/login");
      }
    });
  }

  viewCurrentUser(User) {
    console.log("in viewCurrentUser");
    if (User) {
      this.storage.remove(this.USER_STORAGE_NAME);
      this.storage.set(this.USER_STORAGE_NAME, JSON.stringify(User));

      console.log(User);
      this.router.navigateByUrl("/app/tabs/profile");
    }
  }

  addNewUser() {
    this.router.navigateByUrl("/add-student");
  }
}
