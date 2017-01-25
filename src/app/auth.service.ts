import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

import { environment } from '../environments/environment';

@Injectable()
export class AuthService {
    public token: string;

    constructor(private http: Http) {
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.token = currentUser && currentUser.token;
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
                    errMsg = error.messages.join('. ');
                } else {
                    errMsg = err.message ? err.message : err.toString();
                }
                return Observable.throw(errMsg);
            });
    }

    logout(): void {
        this.token = null;
        localStorage.removeItem('currentUser');
    }
}
