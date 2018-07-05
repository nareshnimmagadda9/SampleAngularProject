import { Component, OnInit } from '@angular/core';
import { VendorService } from '~/../src/app/auth/vendor.service';
import { productData } from '~/../src/app/model/productsearch';


@Component({
  selector: 'app-productsearch',
  templateUrl: './productsearch.component.html',
  styleUrls: ['./productsearch.component.css']
})
export class ProductsearchComponent implements OnInit {
  private productsearchData: productData[];
  constructor(
    private vendorService: VendorService

  ) { }

  ngOnInit() {
    this.getproductdetails();

  }
  async getproductdetails() {
    this.productsearchData = await this.vendorService.getProductSearchData("", "CV", "product");
  }
}
