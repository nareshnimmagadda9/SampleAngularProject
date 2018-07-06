import { Component, OnInit } from '@angular/core';
import { VendorService } from '~/../src/app/auth/vendor.service';
import { productData } from '~/../src/app/model/productsearch';
import { categoryData } from '~/../src/app/model/Category';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
declare var $: any;

@Component({
  selector: 'app-productsearch',
  templateUrl: './productsearch.component.html',
  styleUrls: ['./productsearch.component.css']
})
export class ProductsearchComponent implements OnInit {
  form: FormGroup;
  private formSubmitAttempt: boolean;
  public productsearchData: productData[];
  public productCategoryData: categoryData[];
  constructor(
    private vendorService: VendorService,
    private fb: FormBuilder

  ) { }

  ngOnInit() {
    this.getproductdetails();
    this.form = this.fb.group({
      productsearch: ['', Validators.required],
      category: ['', Validators.required],
      txtDesc: ['', Validators.required]
    });
  }

  async getproductdetails() {
    this.productCategoryData = await this.vendorService.getAllDistincitCategory();
    debugger;
  }

  async UserSearch() {
    this.productsearchData = await this.vendorService.getProductSearchData(
      this.form.value.productsearch,
      this.form.value.category,
      this.form.value.txtDesc);
    $("#tbl_searchData").removeClass('hide');
  }
}
