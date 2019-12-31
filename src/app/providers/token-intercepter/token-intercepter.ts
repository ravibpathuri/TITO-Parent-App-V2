import { Injectable, Injector } from "@angular/core";
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpHeaders,
  HttpClient
} from "@angular/common/http";
import { Observable, from } from "rxjs";

import { Storage } from "@ionic/storage";

@Injectable()
export class TokenIntercepter implements HttpInterceptor {
  uuid: string = "";
  token: string = "";
  headers;
  constructor(public storage: Storage) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (this.token === "") {
      this.getTokens().then(result => {
        if (result) {
          let jsonUser = JSON.parse(result);
          this.token = jsonUser.authToken;
        }
      });
    }

    this.headers = new HttpHeaders({
      Authorization: "Bearer " + this.token,
      //   Authorization:
      //     "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IlAwMzUwMDAwMDIiLCJuYW1laWQiOiJQMDM1MDAwMDAyIiwiR3JvdXBfSUQiOiIzNSIsIkJyYW5jaF9JRCI6IjU4IiwiT3JnYW5pemF0aW9uX0lEIjoiNDMiLCJBZG1pc3Npb25JZCI6IjEzNDU4IiwiRW5yb2xsbWVudElkIjoiMTQyMzAiLCJQYXJlbnRJZCI6IjI3MDcwIiwiQVlJZCI6IjkzIiwiUGFyZW50TG9naW5JZCI6IlAwMzUwMDAwMDIiLCJNYWNBZGRyZXNzIjoiMTIxNDU0NTY0IiwibmJmIjoxNTIxMjkwNjg5LCJleHAiOjE1NTI4MjY2ODksImlhdCI6MTUyMTI5MDY4OSwiaXNzIjoic2VsZiIsImF1ZCI6Imh0dHA6Ly9teXNjaG9vbC5wcmVkaWZhc3QuY29tL2FwaSJ9.HLGl_j204M80AXUlw2-oUwJ4rHjBB9GPKPHClvaLa70",
      UUID: this.uuid,
      "Content-Type": "application/json"
    });
    console.log(`request created with token : ${this.token}`);
    const authRequest = request.clone({ headers: this.headers });
    return next.handle(authRequest);
  }

  async getTokens() {
    return await this.storage.get("currentUser");
  }
}
