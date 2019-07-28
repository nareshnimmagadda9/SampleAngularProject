import { ApiUrlService } from './../../services/apiUrl.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  siteUrl:any;

  constructor(private apiUrl: ApiUrlService) { }

  ngOnInit() {
    this.siteUrl = this.apiUrl.appurl;
  }

}
