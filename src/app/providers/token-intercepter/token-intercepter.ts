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
import { map, catchError, switchMap } from "rxjs/operators";

import { Storage } from "@ionic/storage";

const TOKEN_KEY = "currentUser";

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
    return from(this.storage.get(TOKEN_KEY)).pipe(
      switchMap(data => {
        if (data) {
          let jsonUser = JSON.parse(data);
          this.token = jsonUser.authToken;

          this.headers = new HttpHeaders({
            Authorization: "Bearer " + this.token,
            // Authorization:
            //   "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJHcm91cF9JRCI6IjIzIiwiQnJhbmNoX0lEIjoiNTciLCJPcmdhbml6YXRpb25fSUQiOiIyNCIsIlVzZXJUeXBlX0lEIjoiMyIsIk1hY0FkZHJlc3MiOiIiLCJBZG1pc3Npb25JZCI6IjE5MzMyIiwiRW5yb2xsbWVudElkIjoiMjUxOTMiLCJQYXJlbnRJZCI6IjM5MjI5IiwiQVlJZCI6IjgzIiwiUGFyZW50TG9naW5JZCI6IkFETTAwMDAwNyIsIlZlcnNpb24iOiIyLjAiLCJUb2tlbkV4cGlyeURhdGUiOiIxLzE0LzIwMjAgODowMjoxNyBBTSIsInVuaXF1ZV9uYW1lIjoiQURNMDAwMDA3IiwibmFtZWlkIjoiQURNMDAwMDA3IiwibmJmIjoxNTc3NjkyOTM3LCJleHAiOjE2MDkzMTUzMzcsImlhdCI6MTU3NzY5MjkzNywiaXNzIjoic2VsZiIsImF1ZCI6Imh0dHA6Ly9teXNjaG9vbC5wcmVkaWZhc3QuY29tL2FwaSJ9.xSopIzlQqV-q1N7fP7kpWKWn_rzWFDNYj91NAYjCmhQ",
            UUID: this.uuid,
            "Content-Type": "application/json"
          });

          request = request.clone({ headers: this.headers });
          return next.handle(request);
        } else {
          return next.handle(request);
        }
      })
    );
  }
}
