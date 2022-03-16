import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../model/productModel';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) {
    console.log("Ctor2");
   }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>("../../assets/data.json");
  }
}
