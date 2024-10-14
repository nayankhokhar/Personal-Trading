import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import * as _ from 'lodash';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class CommonService {
  constructor(public http: HttpClient) {}

  get(url: string, params?: any, headers?: any): Observable<any> {
    let queryStr = '';
    if (params) {
      const httpParams = new HttpParams({
        fromObject: params,
      });
      queryStr = httpParams.toString();
    }

    let headerObj = new HttpHeaders();
    if (headers) {
      for (const key of Object.keys(headers)) {
        headerObj = headerObj.set(key, headers[key]);
      }
    }

    return this.http
      .get<any>(environment.host + url + (queryStr ? '?' + queryStr : ''), {})
      .pipe(
        map((response) => response),
        catchError((error) => {
          return throwError(error);
        })
      );
  }
}
