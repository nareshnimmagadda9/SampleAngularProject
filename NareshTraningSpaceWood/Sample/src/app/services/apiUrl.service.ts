import { Injectable } from '@angular/core';

@Injectable({
     providedIn: 'root',
   })
export class ApiUrlService {
    // url = 'http://172.16.2.170:8360/api/';
   url = 'http://localhost:51068/api/';
  // url = 'http://10.110.9.141:8361/api/';
 // url = 'http://111.93.23.205:7777/spacewoodapi/api/';
 appurl = 'http://111.93.23.205:7777/spacewood/';
 serverpath = 'http://111.93.23.205:7777/spacewoodapi/BPDocuments/';
}
