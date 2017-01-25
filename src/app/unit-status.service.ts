import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

import { environment } from '../environments/environment';

import { AuthService } from './auth.service';

@Injectable()
export class UnitStatusService {
  private url = 'http://localhost:3000/';
  private socket;

  constructor(
    private http: Http,
    private authService: AuthService
  ) { }

  getStatus() {}

}
