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

  updateUser(id:any,body:any){
    try {
        return this.http.put<any>(this.baseUrl+this.postUser+"/"+id,body);
    } catch (error:any) {
      return throwError(()=>new Error(error))
    }
  }


 _setLoggedInUserData(data: any) {
  localStorage.setItem('userData',JSON.stringify([data]));
    
    
  } 
  // this method is gives the loggedin user data 
  _getLoggedInUserData() {
   return   localStorage.getItem('userData')
  }



}
