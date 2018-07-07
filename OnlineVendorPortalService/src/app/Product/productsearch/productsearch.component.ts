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
  public categoryData: categoryData[];
  catDesc: "";
  constructor(
    private vendorService: VendorService,
    private fb: FormBuilder

  ) { }

  ngOnInit() {
    this.getproductdetails();
    this.form = this.fb.group({
      productsearch: ['', Validators.required],
      categorydesc: ['', Validators.required],
      txtDesc: ['', Validators.required],
      categoryID: ['', Validators.required]
    });
  }

  async getproductdetails() {
    this.categoryData = await this.vendorService.getAllDistincitCategory();
  }

  async UserSearch() {
    this.productsearchData = await this.vendorService.getProductSearchData(
      this.form.value.productsearch,
      this.catDesc,
      this.form.value.categoryID,
      this.form.value.txtDesc,
    );
    $("#tbl_searchData").removeClass('hide');
  }
  categoryChange($event) {
    if ($event.target.value != "0") {
      this.form.controls['categoryID'].setValue($event.target.value);
      this.catDesc = $event.target[$event.target.selectedIndex].text;
    }

  }
}
