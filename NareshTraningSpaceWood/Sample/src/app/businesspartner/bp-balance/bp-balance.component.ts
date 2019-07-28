import { AuthService } from 'src/app/guards/auth.service';
import { ApiService } from './../../services/api.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-bp-balance',
  templateUrl: './bp-balance.component.html',
  styleUrls: ['./bp-balance.component.css']
})
export class BpBalanceComponent implements OnInit {
bpid: any;
totalbalance: any;
  constructor(private api: ApiService, private auth: AuthService, private toastr: ToastrService) { }

  ngOnInit() {
    this.bpid = this.auth.idFromToken();
    this.checkBalance();
  }
checkBalance() {
  const url = 'Users/totalbalance';
  this.api.postService(url,this.bpid).subscribe(response => {
this.totalbalance = response;
  }, error => {
    this.toastr.error(error.error);
  });


}
}
