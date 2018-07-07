import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, RequestMethod, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { userinfo } from '../model/userinfo';
import { userAccessArray } from '../model/useraccess';
import { productData } from '../model/productsearch';
import { categoryData } from '../model/Category';


@Injectable()
export class VendorService {
  employeeData: userinfo[];
  employeeAccessData: userAccessArray[];
  productSearchData: productData[];
  categoryInfo:categoryData[];
  private URL = 'http://localhost:49897/';
  // private URL = 'http://111.93.23.205:2020/';
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

  async getProductSearchData(Item: string, CategoryDesc: string, categoryID: string,Description:string) {
    const subUrl = this.URL + 'api/vendor/RetrieveProductSearchData';
    let params = new URLSearchParams();
    params.set('Item', Item);
    params.set('catDesc', CategoryDesc);
    params.set('Category', categoryID);
    params.set('Description', Description);
    
    await this.http.get(subUrl, { search: params })
      .map((data: Response) => {
        return data.json() as productData[];
      }).toPromise().then(x => {
        debugger;
        this.productSearchData = x as productData[];
      });
    return this.productSearchData;
  }
  async getAllDistincitCategory() {
    const subUrl = this.URL + 'api/vendor/RetriveCategoryData';
    await this.http.get(subUrl)
      .map((data: Response) => {
        return data.json() as categoryData[];
      }).toPromise().then(x => {
        this.categoryInfo = x as categoryData[];
      });
    return this.categoryInfo;
  }
}
