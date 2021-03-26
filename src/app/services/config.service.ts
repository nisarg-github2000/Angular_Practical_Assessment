import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  private readonly dataUrl = "http://localhost:3000/company"

  constructor(private http: HttpClient) {

  }

  getAllCompanies() {
    return this.http.get(this.dataUrl)
      .pipe(
        catchError(this.handleError)
      );
  }

  // editCompany() {
  //   return this.http.put(this.dataUrl)
  //     .pipe(
  //       catchError(this.handleError)
  //     );
  // }

  // addCompany() {
  //   return this.http.post(this.dataUrl)
  //     .pipe(
  //       catchError(this.handleError)
  //     );
  // }

  // getCompany() {
  //   return this.http.get(this.dataUrl)
  //     .pipe(
  //       catchError(this.handleError)
  //     );
  // }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }

}
