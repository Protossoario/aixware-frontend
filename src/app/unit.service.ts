import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

import { environment } from '../environments/environment';

import { AuthService } from './auth.service';
import { Unit } from './unit';

@Injectable()
export class UnitService {

  constructor(
    private http: Http,
    private authService: AuthService
  ) { }
  
  getUnits(): Observable<Unit[]> {
    let headers = new Headers({ 'x-access-token': this.authService.token });
    let options = new RequestOptions({ headers: headers });
    return this.http.get(environment.apiURL + '/units', options)
      .map((response: Response) => response.json().data);
  }

  postUnit(unit: Unit): Observable<Unit> {
    let headers = new Headers({ 'x-access-token': this.authService.token });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(environment.apiURL + '/units', unit, options)
      .map((response: Response) => response.json().data)
      .catch((err: Response | any) => {
        let errMsg: string;
        if (err instanceof Response) {
          const body = err.json() || '';
          const error = body.error || JSON.stringify(body);
          errMsg = error.messages.join(' ');
        } else {
          errMsg = err.message ? err.message : err.toString();
        }
        return Observable.throw(errMsg);
      });
  }

}
