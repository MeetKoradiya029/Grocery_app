import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { throwError } from 'rxjs';
import { UserModel } from 'src/app/Models/user-model';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl = environment.baseUrl;
  postUser = environment.postUserUrl;

  getUserUrl = environment.getUsersUrl;
  baseURL = environment.baseURL;
  registerURL = environment.registerUser;
  loginURL = environment.loginUser;
  changePasswordUrl = environment.changePassword
  updateProfile = environment.updateProfile
  getUserDetailUrl = environment.getUserDetails
  addAddressUrl = environment.addAddress

  snackHorizontal:MatSnackBarHorizontalPosition='start';
  snackVertical:MatSnackBarVerticalPosition = 'bottom';
  snackmsg:any;
  snackaction:any;


  constructor(private http:HttpClient,private snackbar:MatSnackBar) { }

  // getUsers(){
  //   try {
      
  //     return this.http.get<any>(this.baseUrl+this.getUserUrl);
  //   } catch (error:any) {
  //     return throwError(()=>new Error(error));
  //   }
  // }

  // RegisterUser(body:any){
  //     try {
  //       return this.http.post<any>(this.baseUrl+this.postUser,body);
  //     } catch (error:any) {
  //       return throwError(()=>new Error(error));
  //     }
  // }

  registerUser(body:UserModel){
    try {
        return this.http.post<UserModel>(this.baseURL+this.registerURL,body);
    } catch (error:any) {
      return throwError(()=>new Error(error))
    }
  }

  loginUser(body:any){
    try {
      return this.http.post<any>(this.baseURL+this.loginURL,body);
    } catch (error:any) {
      return throwError(()=>new Error(error))
    }
  }

  getUserDetail(){
      try {
        let reqheaders  = {
          'ngrok-skip-browser-warning': 'skip-browser-warning'
        }     
        const requestOptions = {                                                                                                                                                                         
          headers: new Headers(reqheaders), 
        };
        return this.http.get<any>(this.baseURL+this.getUserDetailUrl,
          {headers: new HttpHeaders({'ngrok-skip-browser-warning': 'skip-browser-warning', 'Access-Control-Allow-Origin': '*'})});
        //return this.http.get<any>(this.baseURL+this.getUserDetailUrl);
      } catch (error:any) {
        return throwError(()=>new Error(error))
      }
  }

  changePassword(body:any){
    try {
      return this.http.put<any>(this.baseURL+this.changePasswordUrl,body);
    } catch (error:any) {
      return throwError(()=> new Error(error))
    }
  }

  updateUser(body:any){
    try {
        return this.http.put<any>(this.baseURL+this.updateProfile,body);
    } catch (error:any) {
      return throwError(()=>new Error(error))
    }

    
  }

  addAddress(body:any){
    try {
      return this.http.post<any>(this.baseURL+this.addAddressUrl,body);
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

  openSnackBar(snackmsg:any,snackaction:any,snackHorizontal:MatSnackBarHorizontalPosition,snackVertical:MatSnackBarVerticalPosition){
    this.snackbar.open(snackmsg,snackaction,{
      horizontalPosition:snackHorizontal,
      verticalPosition:snackVertical
    })
  }


}
