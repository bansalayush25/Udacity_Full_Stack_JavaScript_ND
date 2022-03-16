import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/model/productModel';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];
  
  constructor(private productService: ProductService) {
    console.log("Ctor")
   }

  ngOnInit(): void {
    console.log("Products init")
    this.productService.getProducts().subscribe((res): void => {
      this.products = res;
    });
  }
}
