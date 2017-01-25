import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

import { environment } from '../environments/environment';

import { AuthService } from './auth.service';
import { User } from './user';

@Injectable()
export class UserService {
    constructor(
        private http: Http,
        private authService: AuthService) {}

    getUsers(): Observable<User[]> {
        let headers = new Headers({ 'x-access-token': this.authService.token });
        let options = new RequestOptions({ headers: headers });
        return this.http.get(environment.apiURL + '/users', options)
            .map((response: Response) => response.json().data);
    }
}
