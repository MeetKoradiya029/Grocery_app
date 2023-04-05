import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Category } from 'src/app/Models/category-model';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  baseUrl = environment.baseURL;
  getAllCategory = environment.getAllcategory;

  constructor(private http: HttpClient) {}
  categoryParse: any;

  getAllCategories(): Observable<any> {
    try {
      this.categoryParse = this.http.get<any>(
        this.baseUrl + this.getAllCategory,
        {
          headers: new HttpHeaders({
            'ngrok-skip-browser-warning': 'skip-browser-warning',
            'Access-Control-Allow-Origin': '*',
          }),
        }
      );
      console.log('category respone ==>>', this.categoryParse);
      return this.categoryParse;
    } catch (error: any) {
      return throwError(() => new Error(error));
    }
  }

 
}
