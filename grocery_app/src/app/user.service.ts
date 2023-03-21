import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl = environment.baseUrl;
  postUser = environment.postUserUrl;
  getUserUrl = environment.getUsersUrl;
  constructor(private http:HttpClient) { }

  getUsers(){
    try {
      
      return this.http.get<any>(this.baseUrl+this.getUserUrl);
    } catch (error:any) {
      return throwError(()=>new Error(error));
    }
  }

  RegisterUser(body:any){
      try {
        return this.http.post<any>(this.baseUrl+this.postUser,body);
      } catch (error:any) {
        return throwError(()=>new Error(error));
      }
  }

  getUserDetail(id:any){
      try {
        return this.http.get<any>(this.baseUrl+this.getUserUrl+"/"+id);
      } catch (error:any) {
        return throwError(()=>new Error(error))
      }
  }


}
