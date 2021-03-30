import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { CompanyModel } from '../models/company-model';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  private readonly url = "http://localhost:3000/companies"
  private readonly Surl = "../../assets/company.json"

  constructor(private http: HttpClient) {

  }

  getAllCompanies() {
    return this.http
      .get<CompanyModel[]>(this.url)
      .pipe(catchError(this.handleError));
  }

  getId() {
    return new Promise((resolve, reject) => {
      let maxId = 0;
      this.http
        .get<CompanyModel[]>(this.url)
        .subscribe((resp: CompanyModel[]) => {
          resp.map((ele) => {
            ele.id = parseInt('' + ele.id);
            console.log(ele);

            if (ele.id > maxId) {
              maxId = ele.id;
            }
          });
          return resolve(++maxId);
        });
    });
  }

  getCompanyById(id: any) {
    return this.http
      .get(`${this.url}/${id}`)
      .pipe(catchError(this.handleError));
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

  addCompany(company: CompanyModel) {
    return this.http.post(this.url, company).pipe(catchError(this.handleError));
  }

  editCompany(company: CompanyModel) {
    return this.http
      .put(`${this.url}/${company.id}`, company)
      .pipe(catchError(this.handleError));
  }

  deleteCompany(id: any) {
    return this.http
      .delete(`${this.url}/${id}`)
      .pipe(catchError(this.handleError));
  }

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
