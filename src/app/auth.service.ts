import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable, BehaviorSubject } from 'rxjs';
import 'rxjs/add/operator/map';

import { environment } from '../environments/environment';

import { User } from './user';

@Injectable()
export class AuthService {
  public token: string;
  private currentUserSource = new BehaviorSubject<User>(null);
  // BehaviorSubject allows us to return an Observable for the current user stream
  // This enables any component to subscribe to currentUserStream and listen for changes to it
  public currentUserStream = this.currentUserSource.asObservable();

  constructor(private http: Http) {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.token = currentUser && currentUser.token;
    this.currentUserSource.next(currentUser);
  }


  login(username: string, password: string): Observable<boolean> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(environment.apiURL + '/authenticate', { username: username, password: password }, options)
      .map((response: Response) => {
        let data = response.json().data;
        let token = data.token;
        if (token) {
          this.token = token;
          this.currentUserSource.next(data);
          localStorage.setItem('currentUser', JSON.stringify({ username: username, token: token }));
          return true;
        } else {
          return false;
        }
      })
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

  logout(): void {
    this.token = null;
    this.currentUserSource.next(null);
    localStorage.removeItem('currentUser');
  }

}
