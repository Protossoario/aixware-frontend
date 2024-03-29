import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import 'rxjs/add/operator/map';

import { environment } from '../../environments/environment';

import { AuthService } from './auth.service';
import { Unit } from '../_models/unit';

@Injectable()
export class UnitService {
  private unitStore: Unit[];
  private unitSource: BehaviorSubject<Unit[]>;
  private statusesSource: Subject<any>;

  constructor(
    private http: Http,
    private authService: AuthService
  ) {
    this.unitStore = [];
    this.unitSource = new BehaviorSubject<Unit[]>([]);
    this.statusesSource = new Subject<any>();
    this.statusesSource.delay(5000).subscribe(this.loadAllStatuses.bind(this));
  }

  get units(): Observable<Unit[]> {
    return this.unitSource.asObservable();
  }

  getUnit(id): Observable<Unit> {
    let unit = this.unitStore.find((unit) => unit._id === id);
    if (unit) return Observable.of(unit);
    let headers = new Headers({ 'x-access-token': this.authService.token });
    let options = new RequestOptions({ headers: headers });
    return this.http.get(environment.apiURL + '/units/' + id, options)
      .map((response: Response) => response.json().data)
      .catch(this.errorHandler);
  }

  sortByName(u1: Unit, u2: Unit) {
    return u1.name.localeCompare(u2.name);
  }

  loadAllStatuses() {
    this.getAllStatuses().subscribe((statuses) => this.statusesSource.next(statuses));
  }
  
  loadAll() {
    Observable.combineLatest(this.getAllUnits(), this.statusesSource, (units, statuses) => {
      for (let index in units) {
        const unit = units[index];
        const lastCreatedAt = statuses.find((status) => status._id === unit._id);
        let timeDiffInSeconds = Date.now() - Date.parse(lastCreatedAt) / 1000;
        units[index].active = timeDiffInSeconds > 5;
      }
      return units;
    }).subscribe((units) => {
      this.unitStore = units.sort(this.sortByName);
      this.unitSource.next(units);
    })
    this.loadAllStatuses();
  }

  getAllUnits(): Observable<any> {
    let headers = new Headers({ 'x-access-token': this.authService.token });
    let options = new RequestOptions({ headers: headers });
    return this.http.get(environment.apiURL + '/units', options)
      .map((res) => res.json().data)
      .catch(this.errorHandler);
  }

  getAllStatuses(): Observable<any> {
    let headers = new Headers({ 'x-access-token': this.authService.token });
    let options = new RequestOptions({ headers: headers });
    return this.http.get(environment.apiURL + '/units/last-statuses', options)
      .map((res) => res.json().data)
      .catch(this.errorHandler);
  }

  create(unit: Unit): Observable<any> {
    let headers = new Headers({ 'x-access-token': this.authService.token });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(environment.apiURL + '/units', unit, options)
      .map((response: Response) => {
        const unit = response.json().data;
        this.unitStore.push(unit);
        this.unitStore = this.unitStore.sort(this.sortByName);
        this.unitSource.next(this.unitStore);
        return Observable.empty();
      })
      .catch(this.errorHandler);
  }

  update(unit: Unit): Observable<any> {
    let headers = new Headers({ 'x-access-token': this.authService.token });
    let options = new RequestOptions({ headers: headers });
    return this.http.put(environment.apiURL + '/units/' + unit._id, unit, options)
      .map((response: Response) => {
        const unit = response.json().data;
        const index = this.unitStore.findIndex(u => u._id === unit._id);
        this.unitStore[index] = unit;
        this.unitStore = this.unitStore.sort(this.sortByName);
        this.unitSource.next(this.unitStore);
        return Observable.empty();
      })
      .catch(this.errorHandler);
  }

  delete(unit: Unit): Observable<any> {
    let headers = new Headers({ 'x-access-token': this.authService.token });
    let options = new RequestOptions({ headers: headers });
    return this.http.delete(environment.apiURL + '/units/' + unit._id, options)
      .map((response: Response) => {
        const unit = response.json().data;
        const index = this.unitStore.findIndex(u => u._id === unit._id);
        this.unitStore.splice(index, 1);
        this.unitSource.next(this.unitStore);
        return Observable.empty();
      })
      .catch(this.errorHandler);
  }

  errorHandler(err: Response | any): Observable<any> {
    let errMsg: string;
    if (err instanceof Response) {
      const body = err.json() || '';
      const error = body.error.messages.join(' ') || JSON.stringify(body);
      errMsg = error;
    } else {
      errMsg = err.message ? err.message : err.toString();
    }
    return Observable.throw(errMsg);
  }

}
