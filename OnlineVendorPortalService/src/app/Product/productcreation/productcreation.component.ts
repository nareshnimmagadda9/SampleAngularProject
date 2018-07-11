import { Component, OnInit } from '@angular/core';
import { VendorService } from '~/../src/app/auth/vendor.service';
import { productData } from '~/../src/app/model/productsearch';
import { categoryData } from '~/../src/app/model/Category';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
declare var $: any;

@Component({
  selector: 'app-productcreation',
  templateUrl: './productcreation.component.html',
  styleUrls: ['./productcreation.component.css']
})
export class ProductcreationComponent implements OnInit {
  form: FormGroup;
  private formSubmitAttempt: boolean;
  public productsearchData: productData[];
  public categoryData: categoryData[];

  constructor(
    private vendorService: VendorService,
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      categorydesc: ['', Validators.required],
      txtDesc: ['', Validators.required],
      categoryID: ['', Validators.required]
    });
  }
  ProductCreation() {
  }
}
