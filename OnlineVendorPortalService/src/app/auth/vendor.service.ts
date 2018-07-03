import { Injectable } from '@angular/core';
import { Http, Response,  RequestOptions, RequestMethod, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { userinfo } from '../model/userinfo';
import { userAccessArray } from '../model/useraccess';


@Injectable()
export class VendorService {
  employeeData: userinfo[];
  employeeAccessData: userAccessArray[];
  private URL = 'http://localhost:49897/';
  // private URL = 'http://172.16.2.98:2020/';
  constructor(private http: Http) { }

  async getUserDetails(UserName: string, password: string) {
    const subUrl = this.URL + 'api/vendor/RetrieveUserLoginDetails';
    let params = new URLSearchParams();
    params.set('UserName', UserName);
    params.set('Password', password);
    await this.http.get(subUrl, { search: params })
      .map((data: Response) => {
        return data.json() as userinfo[];
      }).toPromise().then(x => {
        this.employeeData = x;
      });
    return this.employeeData;
  }
  async getAllUSerAccessGroupandSubGroups(ID: string) {
    const subUrl = this.URL + 'api/vendor/RetrieveUserAccessDetailsByID';
    let params = new URLSearchParams();
    params.set('ID', ID);
    await this.http.get(subUrl, { search: params })
      .map((data: Response) => {
        return data.json() as userAccessArray[];
      }).toPromise().then(x => {
        this.employeeAccessData = x as userAccessArray[];
      });
    return this.employeeAccessData;
  }
}
