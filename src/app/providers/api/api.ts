import {
  HttpClient,
  HttpClientModule,
  HttpParams,
  HttpErrorResponse
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, retry } from "rxjs/operators";
import { throwError } from "rxjs";

/**
 * Api is a generic REST Api handler. Set your API url first.
 */
@Injectable()
export class Api {
  url: string = "https://applebee-tito-qa.azurewebsites.net/api/v1/parent";

  constructor(public http: HttpClient) {
    this.url = "https://applebee-tito-qa.azurewebsites.net/api/v1/parent";
  }

  get(endpoint: string, params?: any, reqOpts?: any) {
    if (!reqOpts) {
      reqOpts = {
        params: new HttpParams()
      };
    }

    // Support easy query params for GET requests
    if (params) {
      reqOpts.params = new HttpParams();
      for (let k in params) {
        reqOpts.params = reqOpts.params.set(k, params[k]);
      }
    }

    let req = this.http.get(this.url + "/" + endpoint, reqOpts);
    req.pipe(retry(3), catchError(this.handleError));
    return req;
  }

  post(endpoint: string, body: any, reqOpts?: any) {
    let req = this.http.post(`${this.url}/${endpoint}`, body, reqOpts);
    req.pipe(retry(3), catchError(this.handleError));
    return req;
  }

  put(endpoint: string, body: any, reqOpts?: any) {
    return this.http.put(this.url + "/" + endpoint, body, reqOpts);
  }

  delete(endpoint: string, reqOpts?: any) {
    return this.http.delete(this.url + "/" + endpoint, reqOpts);
  }

  patch(endpoint: string, body: any, reqOpts?: any) {
    return this.http.patch(this.url + "/" + endpoint, body, reqOpts);
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error("An error occurred:", error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    // return an ErrorObservable with a user-facing error message
    return throwError("Something bad happened; please try again later.");
  }
}
