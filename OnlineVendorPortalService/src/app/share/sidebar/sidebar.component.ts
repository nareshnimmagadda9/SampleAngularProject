import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AuthService } from '~/../src/app/auth/auth.service';
import { Observable } from 'rxjs';
import { Router, RouterLink } from '@angular/router';
import * as $ from 'jquery';
import { VendorService } from '~/../src/app/auth/vendor.service'
import { userAccessArray } from '~/../src/app/model/useraccess';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit, AfterViewInit {

  isLoggedIn$: boolean;
  AccessData: userAccessArray[];
  constructor(private authService: AuthService,
    private vendorService: VendorService
  ) { }

  ngOnInit() {
    this.isLoggedIn$ = this.authService.isLoggedIn;
    this.getUserAccessGroupandSubGroups();
  }
  async getUserAccessGroupandSubGroups() {
    this.AccessData = await this.vendorService.getAllUSerAccessGroupandSubGroups(localStorage.getItem("LoggedInUserName"));
    var groups = {};
    var htmlULLI = "", childhtmlLI = "";
    for (var i = 0; i < this.AccessData.length; i++) {
      var groupName = this.AccessData[i]["GroupName"];
      if (!groups[groupName]) {
        groups[groupName] = [];
      }
      groups[groupName].push(this.AccessData[i]["SubGroupName"]);
    }
    for (var groupNames in groups) {
      htmlULLI += "<li _ngcontent-c3>";
      htmlULLI += "<a _ngcontent-c3 href='#" + groupNames.replace(" ", "") + "' data-toggle='collapse' aria-expanded='false'>" + groupNames + "</a>";
      htmlULLI += "<ul _ngcontent-c3 class='collapse list-unstyled' id=" + groupNames.replace(" ", "") + ">";
      childhtmlLI = "";
      for (var i = 0; i < groups[groupNames].length; i++) {
        var groupname=groupNames.replace(" ", "").toLowerCase();
        var subname = groups[groupNames][i].replace(" ", "").toLowerCase();
        childhtmlLI += "<li _ngcontent-c3><a _ngcontent-c3 href='/"+groupname+"/" + subname + "'>" + groups[groupNames][i] + "</a></li>";
      }
      htmlULLI += childhtmlLI + "</ul></li>";
    }
    $("#slideBarData").html(htmlULLI);
  }
  ngAfterViewInit() {

    $('#dismiss, .overlay').on('click', function () {
      $('#sidebar').removeClass('active');
      $('.overlay').fadeOut();
    });

    $('#sidebarCollapse').on('click', function () {
      $('#sidebar').addClass('active');
      $('.overlay').fadeIn();
      $('.collapse.in').toggleClass('in');
      $('a[aria-expanded=true]').attr('aria-expanded', 'false');
    });
  }
}
