import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

import { environment } from '../../../environments/environment';

import { AuthService } from '../../core/auth.service';
import { User } from '../../_models/user';

@Injectable()
export class UserService {
    constructor(
      private http: Http,
      private authService: AuthService) { }

    getUsers(): Observable<User[]> {
      let headers = new Headers({ 'x-access-token': this.authService.token });
      let options = new RequestOptions({ headers: headers });
      return this.http.get(environment.apiURL + '/users', options)
        .map((response: Response) => response.json().data)
        .catch(this.errorHandler);
    }

    create(user: User): Observable<any> {
      let headers = new Headers({ 'x-access-token': this.authService.token });
      let options = new RequestOptions({ headers: headers });
      return this.http.post(environment.apiURL + '/users', user, options)
        .map((response: Response) => response.json().data)
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
