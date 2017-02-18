import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable, Subject } from 'rxjs';
import 'rxjs/add/operator/map';

import { environment } from '../../../environments/environment';

import { AuthService } from '../../core/auth.service';
import { UnitStatus } from '../../_models/unit-status';

@Injectable()
export class UnitStatusService {
  private socket;

  constructor(
    private http: Http,
    private authService: AuthService
  ) { }

  getLiveStatusData(unitId): Observable<UnitStatus> {
    let pollSubject = new Subject<UnitStatus>();
    let subscribeToNewRequest = () => {
      this.getStatus(unitId).subscribe((res) => { pollSubject.next(res.json().data) });
    }
    pollSubject.delay(5000).subscribe(subscribeToNewRequest);
    subscribeToNewRequest();
    return pollSubject.asObservable();
  }

  getStatus(unitId): Observable<any> {
    let headers = new Headers({ 'x-access-token': this.authService.token });
    let options = new RequestOptions({ headers: headers });
    return this.http.get(environment.apiURL + '/units/' + unitId + '/status', options);
  }

}
