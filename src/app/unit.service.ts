import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable, BehaviorSubject } from 'rxjs';
import 'rxjs/add/operator/map';

import { environment } from '../environments/environment';

import { AuthService } from './auth.service';
import { Unit } from './unit';

@Injectable()
export class UnitService {
  private unitStore: Unit[];
  private unitSource: BehaviorSubject<Unit[]>;

  constructor(
    private http: Http,
    private authService: AuthService
  ) {
    this.unitStore = [];
    this.unitSource = new BehaviorSubject<Unit[]>([]);
  }

  get units(): Observable<Unit[]> {
    return this.unitSource.asObservable();
  }
  
  loadAll(): Observable<Unit[]> {
    let headers = new Headers({ 'x-access-token': this.authService.token });
    let options = new RequestOptions({ headers: headers });
    let request = this.http.get(environment.apiURL + '/units', options)
      .map((response: Response) => response.json().data);
    request
      .catch(this.errorHandler)
      .subscribe((units) => {
        this.unitStore = units;
        this.unitSource.next(units);
      }, (err: Response | any) => {
        console.error('Could not load units: ');
        console.error(err);
      });
    return request;
  }

  create(unit: Unit): Observable<Unit[]> {
    let headers = new Headers({ 'x-access-token': this.authService.token });
    let options = new RequestOptions({ headers: headers });
    let request = this.http.post(environment.apiURL + '/units', unit, options)
      .map((response: Response) => response.json().data);
    request
      .catch(this.errorHandler)
      .subscribe((unit) => {
        this.unitStore.push(unit);
        this.unitSource.next(this.unitStore);
      })
    return request;
  }

  errorHandler(err: Response | any) {
    let errMsg: string;
    if (err instanceof Response) {
      const body = err.json() || '';
      const error = body.error || JSON.stringify(body);
      errMsg = error.messages.join(' ');
    } else {
      errMsg = err.message ? err.message : err.toString();
    }
    return Observable.throw(errMsg);
  }

}
