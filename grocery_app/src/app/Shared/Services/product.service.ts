import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  baseURL = environment.baseURL;
  getAllProductsByCategoryIdUrl = environment.getAllProductsByCategoryId;
  getProductByIdUrl = environment.getProductById;

  constructor(private http: HttpClient) {}

  products: any[] = [
    {
      id: 1,
      name: 'Apple',
      description: 'A juicy red apple.',
      price: 0.99,
      category: 'fruits',
      priceOf: '1 kg price',
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXljqA-TVxM-AV_btLcUsIVmuaTVo1Tw4yOQ&usqp=CAU',
    },
    {
      id: 2,
      name: 'Banana',
      category: 'fruits',
      description: 'A ripe yellow banana.',
      price: 0.59,
      priceOf: '6 pcs price',
      image:
        'https://img.freepik.com/premium-photo/fresh-bananas-cardboard-boxes-big-super-market_260418-469.jpg',
    },
  ];

  getProducts() {
    return this.products;
  }

  getSingleProduct(id: any) {
    this.products[id];
  }

  getProductByCategoryId(encryption: any): Observable<any> {
    try {
      return this.http.get<any>(
        this.baseURL + this.getAllProductsByCategoryIdUrl,
        {
          headers: new HttpHeaders({
            'ngrok-skip-browser-warning': 'skip-browser-warning',
            'Access-Control-Allow-Origin': '*',
            'category_id': encryption,
          }),
        }
      );
    } catch (error: any) {
      return throwError(() => new Error(error));
    }
  }
  getProductById(encryption: any) {
    try {
      return this.http.get<any>(this.baseURL + this.getProductById, {
        headers: new HttpHeaders({
          'ngrok-skip-browser-warning': 'skip-browser-warning',
          'Access-Control-Allow-Origin': '*',
          'product_id': encryption,
        }),
      });
    } catch (error: any) {
      return throwError(() => new Error(error));
    }
  }
}
