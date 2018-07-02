import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestMethod,URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { userinfo } from '../auth/userinfo';


@Injectable()
export class VendorService {
  employeeList: userinfo[];
  private URL = 'http://localhost:49897/';
  constructor(private http: Http) { }

  async getUserDetails(ID: string, password: string) {
    const subUrl = this.URL + 'api/vendor/RetrieveUserLoginDetails';
    let params = new URLSearchParams();
    params.set('ID', ID);
    params.set('Password', password);
    await this.http.get(subUrl, { search: params })
      .map((data: Response) => {
        return data.json() as userinfo[];
      }).toPromise().then(x => {
        this.employeeList = x;
      });
      return this.employeeList;
  }
}
