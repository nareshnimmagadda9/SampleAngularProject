import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

import { filter, map, catchError } from 'rxjs/operators';
import { ApiUrlService } from './apiUrl.service';

@Injectable({
    providedIn: 'root',
  })

export class ApiService {

    constructor(private http: HttpClient, private apiUrl: ApiUrlService) { }

    getService(url): Observable<any> {
        const httpHeaders = new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin' : '*'
        });
        const options = { headers: httpHeaders };

        return this.http.get(this.apiUrl.url + url, options).pipe(
            map((response: Response) => {
                return response;
            })
        );
    }

    // post service
    postService(url, data): Observable<any> {

        const httpHeaders = new HttpHeaders({
            'Content-Type': 'application/json'
        });
        const options = { headers: httpHeaders };

        return this.http.post(this.apiUrl.url + url, JSON.stringify(data), options).pipe(
            map((response: Response) => {
                return response;
            })
        );
    }

    fileService(url, data): Observable<any> {

        const httpHeaders = new HttpHeaders({
            'Content-Type': 'application/json'
        });
        const options = { headers: httpHeaders };

        return this.http.post(this.apiUrl.url + url, data).pipe(
            map((response: Response) => {
                return response;
            })
        );
    }

    // put service
    putService(url, data): Observable<any> {

        const httpHeaders = new HttpHeaders({
            'Content-Type': 'application/json'
        });
        const options = { headers: httpHeaders };

        return this.http.post(this.apiUrl.url + url, JSON.stringify(data), options).pipe(
            map((response: Response) => {
                return response;
            })
        );
    }

    // delete service
    deleteService(url): Observable<any> {

        const httpHeaders = new HttpHeaders({
            'Content-Type': 'application/json'
        });
        const options = { headers: httpHeaders };

        return this.http.delete(this.apiUrl.url + url, options).pipe(
            map((response: Response) => {
                return response;
            })
        );
    }

}
