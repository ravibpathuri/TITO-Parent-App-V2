import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { Router } from "@angular/router";
import { SwUpdate } from "@angular/service-worker";

import { MenuController, Platform, ToastController } from "@ionic/angular";

import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";

import { Storage } from "@ionic/storage";

import { UserData } from "./providers/user-data";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  appPages = [
    {
      title: "Home",
      url: "/app/tabs/schedule",
      icon: "home"
    },
    {
      title: "SMS-Messages",
      url: "/app/tabs/speakers",
      icon: "mail"
    },
    { title: "Notifications", url: "/app/tabs/speakers", icon: "megaphone" },
    { title: "Diary", url: "/app/tabs/speakers", icon: "paper" },
    { title: "Syllabus", url: "/app/tabs/speakers", icon: "book" },
    { title: "Fee", url: "/app/tabs/speakers", icon: "cash" },
    { title: "Attendance", url: "/app/tabs/speakers", icon: "pie" },
    { title: "Holidays", url: "/app/tabs/speakers", icon: "calendar" },
    { title: "Assessments", url: "/app/tabs/speakers", icon: "clipboard" },
    { title: "Transport", url: "/app/tabs/speakers", icon: "bus" },
    { title: "Photos", url: "/app/tabs/speakers", icon: "images" },
    { title: "Update Password", url: "/app/tabs/speakers", icon: "key" },
    { title: "Communicate", url: "/app/tabs/speakers", icon: "chatbubbles" }
  ];
  loggedIn = false;
  dark = false;

  constructor(
    private menu: MenuController,
    private platform: Platform,
    private router: Router,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private storage: Storage,
    private userData: UserData,
    private swUpdate: SwUpdate,
    private toastCtrl: ToastController
  ) {
    this.initializeApp();
  }

  async ngOnInit() {
    this.checkLoginStatus();
    this.listenForLoginEvents();

    this.swUpdate.available.subscribe(async res => {
      const toast = await this.toastCtrl.create({
        message: "Update available!",
        showCloseButton: true,
        position: "bottom",
        closeButtonText: `Reload`
      });

      await toast.present();

      toast
        .onDidDismiss()
        .then(() => this.swUpdate.activateUpdate())
        .then(() => window.location.reload());
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  checkLoginStatus() {
    return this.userData.isLoggedIn().then(loggedIn => {
      return this.updateLoggedInStatus(loggedIn);
    });
  }

  updateLoggedInStatus(loggedIn: boolean) {
    setTimeout(() => {
      this.loggedIn = loggedIn;
    }, 300);
  }

  listenForLoginEvents() {
    window.addEventListener("user:login", () => {
      this.updateLoggedInStatus(true);
    });

    window.addEventListener("user:signup", () => {
      this.updateLoggedInStatus(true);
    });

    window.addEventListener("user:logout", () => {
      this.updateLoggedInStatus(false);
    });
  }

  logout() {
    this.userData.logout().then(() => {
      return this.router.navigateByUrl("/app/tabs/schedule");
    });
  }

  openTutorial() {
    this.menu.enable(false);
    this.storage.set("ion_did_tutorial", false);
    this.router.navigateByUrl("/tutorial");
  }
}
