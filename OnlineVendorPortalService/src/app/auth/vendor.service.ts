import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, RequestMethod, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { userinfo } from '../model/userinfo';
import { userAccessArray } from '../model/useraccess';
import { productData } from '../model/productsearch';


@Injectable()
export class VendorService {
  employeeData: userinfo[];
  employeeAccessData: userAccessArray[];
  productSearchData:productData[];
  //private URL = 'http://localhost:49897/';
  private URL = 'http://172.16.2.98:2020/';
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
  async getProductSearchData(Item: string, Category: string, Description: string) {
    const subUrl = this.URL + 'api/vendor/RetrieveProductSearchData';
    let params = new URLSearchParams();
    params.set('Item', Item);
    params.set('Category', Category);
    params.set('Description', Description);
    await this.http.get(subUrl, { search: params })
      .map((data: Response) => {
        return data.json() as productData[];
      }).toPromise().then(x => {
        this.productSearchData = x as productData[];
      });
    return this.productSearchData;
  }
}
