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
  private cookie = `_ga=GA1.1.1600915716.1728815779; _abck=0BD597AABB0C3940AF6EBFBD7E9535C5~0~YAAQtoosMT4Ek3SSAQAAApT/iww6VCTomxyRL7AhmxzLObBwklmhblZ80Is6A/T5ujJ8vAmyy1yfg7wURmbHdZDsBu+C03nW7JRPGwb5BcQ6hqxjVwSmOmhRNVj5XfRICHrvSK/UUDHn1FU1SCeM3AktPldSg4mVP9LeSbNv6I27EHmXRE8SWAI7U/q2Yqrm3qXrt22iNNJNeG0nRR8CyEkE/uJlQGpic11LTJYcUpnAw3mpzhXgjxEHbLozVl+lDckQGqeJJD6TEG1jLDiKJgltl5NPUY1eFPuDwxpHWv2WJMLzgmg8/vKvxtziI5z87xICqSxeUjZphLjPWL6su+8y/mDY5AhP80tgCyw5U/WCZP2LFfEEPdE+8d7wyQ56cyH9BKgMIwHfHP9/A6gXpc6yAyRVE6DBa0NnTmwQbfXKFrOJIa/u2sdq2hKroravRsYILaAx7CWyXCo=~-1~-1~-1; defaultLang=en; AKA_A2=A; ak_bmsc=160584632A44EF28D3C6EF9F79D0BBA4~000000000000000000000000000000~YAAQr4osMTK2+2ySAQAANM88jBnkmM4ns03nj05cqko5g/GuzjeMdoAdAQHxTAgrpZUPMAwJDUboAypZU50Cb7rV2g2X4S3M6rvE6NYWpMfTFXp07Da7Jq+coeqArM5NVOeAZB+ccE7U9U2V3pL5H2jXnP8KqrwZrhNt1RguOwApbgzZ82RS5sLWEcbijbsBUD/9tiOe3p/ONCA8GynCUkiyVQhB3LBbK0c8P3SNPf9zIb/DVcbAwM1N1oXiM9GLkjrycPOANXxdiZfCuzqUjKi3VwJ3bLo7/nu+SMaoFkKjuqQdCHA+sU1deK1zinNmmmAftTlDlZcuuy+JIqm8A7X+1BuK2LcpHXv/PnUD48MeAKuXowZ+lClptubSTeszisFcWTgo7kLdvqaSsLPvU5InR/8FOJ80wfNhgfTNU9iJJ/831oHUYUafisHNJV8rZIt0b55eKAwXXX5CmVjFGTxjMNF1Sv8dEU75C7GJ7M0x38GedlU1wjW4; nsit=x6bqU5QblN2LS3H4ltCpUBSQ; nseappid=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJhcGkubnNlIiwiYXVkIjoiYXBpLm5zZSIsImlhdCI6MTcyODkyOTY1NiwiZXhwIjoxNzI4OTM2ODU2fQ.NDSpMjzEi2K3dsMZmcWH_dr2wacEwoDQ07SG5l3CrUY; bm_sz=2E394D5C058DBD50EDE46F73CE772115~YAAQr4osMR65+2ySAQAA+e08jBl7ZdoNw4XKltI4MHfLEf+3SSc6i9Ur+b0nXRIAm4ToTk/rxCGpNq629arkidiOPSz4ou61GmtOJK95LKUPhYsjDcur+MxUaejDoOuMTF3jsqIA5XfWs5KYUTfMRxfZdQoxVbdAD+19e2ZqvJA46hxMh/pcwTSKKKyZ/c7yURwNop9LahgS3SLp44kc6+9JiaxaAS4kqv5CEvkmEj3esv+R+2BedhOpRCZz4VlddhrVqZjVowVORxMqnBYuFztB745Bw73tx5HrSpeahyxTlP1CjvkfP3nPimBEf8p/ETOjLsrsLjsbMMcXRHiXZoNWCrkz/6YPdIP14j5kaGm7YfHnleJZbA9xmoyxKJYu2sYh0+5v5mp845xIQ3X+vetSNlY5Lx6dCaWUxg==~3289414~3159861; _ga_87M7PJ3R97=GS1.1.1728928868.3.1.1728929593.52.0.0; bm_sv=9B40BAD13E2BA789B2B0F5B275EEB84B~YAAQr4osMYy5+2ySAQAA5vI8jBn4tOs8MtYaF3OzJyjmk+taK1H60f3omHaSgSdZAzqKyXW2ODTgHR/U9SZMXtlo0E3m9QTZSyiObedssJbuO7WvjHOkMnnSg9kl1wxwcm1twVlxRE5CCisHxUKdhfaOH1Qx+IbDt4AS7net2yxM1jaUMcqMLurvv3CFXHXUn024nGm5BCIahQZLVjoMag50QougbTSMKfrnU180fW7h1d+0g6GOnNMVwfJXewZgqlDidA==~1; RT="z=1&dm=nseindia.com&si=ae5129e5-2128-4bc3-897e-f92499de0008&ss=m29c189b&sl=2&se=8c&tt=2ub&bcn=%2F%2F684d0d47.akstat.io%2F&ld=9hk&nu=kpaxjfo&cl=b70"`;

  constructor(public http: HttpClient) { }

  public getAdminHeaders(): HttpHeaders {
    return new HttpHeaders({
      'cookie': this.cookie,
    });
  }


  get(url: string, params?: any): Observable<any> {
    let queryStr = '';
    if (params) {
      const httpParams = new HttpParams({
        fromObject: params,
      });
      queryStr = httpParams.toString();
    }

    // Proxy the request via cors-anywhere
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    const fullUrl = `${environment.host + url}${queryStr ? '?' + queryStr : ''}`;

    const headers = new HttpHeaders({
      'cookies': this.cookie,
      'accept': "*/*"
    });

    return this.http
      .get<any>(fullUrl, { headers, withCredentials: true })
      .pipe(
        map((response) => response),
        catchError((error) => {
          return throwError(error);
        })
      );
  }
}
