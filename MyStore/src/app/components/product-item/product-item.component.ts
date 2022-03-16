import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/model/productModel';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {

  @Input() product: Product = new Product();
  constructor() { }

  ngOnInit(): void {
  }

}
