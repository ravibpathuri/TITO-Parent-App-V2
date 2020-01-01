import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage";
import { Api } from "../api/api";

@Injectable()
export class User {
  _user: any;
  USER_STORAGE_NAME = "currentUser";
  ALL_USERS_STORAGE_NAME = "allUsers";
  ISAUTHENTICATED_STORAGE_NAME = "isAuthenticated";

  constructor(public api: Api, public storage: Storage) {}

  /**
   * Send a POST request to our login endpoint with the data
   * the user entered on the form.
   */
  login(accountInfo: any) {
    console.log(accountInfo);
    this.api.post("login", accountInfo).subscribe(
      respose => {
        this._loggedIn(respose);
      },
      err => {
        console.log(err);
      }
    );
  }

  /**
   * Log the user out, which forgets the session
   */
  logout() {
    this.storage.get(this.USER_STORAGE_NAME).then(currentUser => {
      if (currentUser) {
        this._user = JSON.parse(currentUser);
      }
      this.storage.remove(this.USER_STORAGE_NAME);
      this.storage.get(this.ALL_USERS_STORAGE_NAME).then(allUsers => {
        if (allUsers) {
          let allUsersJSON = JSON.parse(allUsers);
          let allUsersJSONModified = [];
          allUsersJSON.forEach(user => {
            if (user.authToken !== this._user.authToken)
              allUsersJSONModified.push(user);
          });
          console.log(allUsersJSONModified);
          this.storage.set(
            this.ALL_USERS_STORAGE_NAME,
            JSON.stringify(allUsersJSONModified)
          );
          this._user = null;
        }
      });
    });

    //this.storage.remove(this.ISAUTHENTICATED_STORAGE_NAME)
  }

  refreshToken() {
    let seq = this.api.get("RefreshToken");

    seq.subscribe(
      (res: any) => {
        this.resetLoggedInToken(res);
        // console.log(res);
      },
      err => {
        console.error("ERROR", err);
      }
    );

    return seq;
  }

  private filterByToken(user) {
    if (user.authToken !== this._user.authToken) return true;
    else return false;
  }

  /**
   * Process a login/signup response to store user data
   */
  _loggedIn(resp) {
    this._user = resp;
    console.log(this._user);
    this.storage.set(this.USER_STORAGE_NAME, JSON.stringify(this._user));
    this.storage.set(this.ISAUTHENTICATED_STORAGE_NAME, true);

    // store to allUsersContainer
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
    });
  }

  resetLoggedInToken(resp) {
    // if responce has a valid token then reset existing token
    if (resp) {
      this._user = resp;
      console.log(this._user);
      this.storage.remove(this.USER_STORAGE_NAME);
      this.storage.set(this.USER_STORAGE_NAME, JSON.stringify(this._user));
      this.storage.set(this.ISAUTHENTICATED_STORAGE_NAME, true);
    }
  }

  isAuthenticated() {
    return this.storage.get(this.ISAUTHENTICATED_STORAGE_NAME);
  }

  getCurrentUser() {
    return this.storage.get(this.USER_STORAGE_NAME);
  }
}
