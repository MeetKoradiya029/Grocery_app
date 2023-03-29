import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { Category } from 'src/app/Models/category-model';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  baseUrl = environment.baseURL;
  getAllCategory = environment.getAllcategory;

  constructor(private http: HttpClient) {}

  getAllCategories(){
      try {
        return this.http.get<Category>(this.baseUrl+this.getAllCategory);
      } catch (error:any) {
        return throwError(()=>new Error(error))
      }
  }

}
