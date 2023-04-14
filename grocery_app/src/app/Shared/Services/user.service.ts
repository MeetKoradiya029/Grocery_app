import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { throwError } from 'rxjs';
import { AddressModel } from 'src/app/Models/address-model';
import { ChangePass } from 'src/app/Models/change-pass';
import { EditUser } from 'src/app/Models/edit-user';
import { UserModel } from 'src/app/Models/register-model';
import { Userlogin } from 'src/app/Models/userlogin';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  baseUrl = environment.baseUrl;
  postUser = environment.postUserUrl;

  getUserUrl = environment.getUsersUrl;
  baseURL = environment.baseURL;
  registerURL = environment.registerUser;
  loginURL = environment.loginUser;
  changePasswordUrl = environment.changePassword;
  updateProfile = environment.updateProfile;
  getUserDetailUrl = environment.getUserDetails;
  addAddressUrl = environment.addAddress;
  editAddressUrl = environment.updateAddress;
  deleteAddressUrl = environment.deleteAddress;
  getAllOrderUrl = environment.getCustomerAllOrder;
  getOrderByIdUrl=environment.getOrderById

  snackHorizontal: MatSnackBarHorizontalPosition = 'start';
  snackVertical: MatSnackBarVerticalPosition = 'bottom';
  snackmsg: any;
  snackaction: any;

  constructor(private http: HttpClient, private snackbar: MatSnackBar) {}

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

  registerUser(body: UserModel) {
    try {
      return this.http.post<UserModel>(this.baseURL + this.registerURL, body);
    } catch (error: any) {
      return throwError(() => new Error(error));
    }
  }

  loginUser(body:Userlogin) {
    try {
      return this.http.post<Userlogin>(this.baseURL + this.loginURL, body);
    } catch (error: any) {
      return throwError(() => new Error(error));
    }
  }

  getUserDetail() {
    try {
      let reqheaders = {
        'ngrok-skip-browser-warning': 'skip-browser-warning',
      };
      const requestOptions = {
        headers: new Headers(reqheaders),
      };
      return this.http.get<any>(this.baseURL + this.getUserDetailUrl, {
        headers: new HttpHeaders({
          'ngrok-skip-browser-warning': 'skip-browser-warning',
          'Access-Control-Allow-Origin': '*',
        }),
      });
      //return this.http.get<any>(this.baseURL+this.getUserDetailUrl);
    } catch (error: any) {
      return throwError(() => new Error(error));
    }
  }

  changePassword(body: ChangePass) {
    try {
      return this.http.put<ChangePass>(this.baseURL + this.changePasswordUrl, body);
    } catch (error: any) {
      return throwError(() => new Error(error));
    }
  }

  updateUser(body: EditUser) {
    try {
      return this.http.put<EditUser>(this.baseURL + this.updateProfile, body);
    } catch (error: any) {
      return throwError(() => new Error(error));
    }
  }

  addAddress(body: AddressModel) {
    try {
      return this.http.post<AddressModel>(this.baseURL + this.addAddressUrl, body);
    } catch (error: any) {
      return throwError(() => new Error(error));
    }
  }
  updateAddress(body: AddressModel, encryption: any) {
    try {
      return this.http.put<AddressModel>(this.baseURL + this.editAddressUrl, body, {
        headers: new HttpHeaders({
          'ngrok-skip-browser-warning': 'skip-browser-warning',
          'Access-Control-Allow-Origin': '*',
          'address_id':encryption
        }),
      });
    } catch (error:any) {
      return throwError(()=>new Error(error))
    }
  }

  deleteAddress(encryption:any){
    try {
      return this.http.delete(this.baseURL+this.deleteAddressUrl,{
        headers:new HttpHeaders({
          'ngrok-skip-browser-warning': 'skip-browser-warning',
          'Access-Control-Allow-Origin': '*',
          'address_id':encryption
        })
      })
    } catch (error:any) {
      return throwError(()=>new Error(error))
    }
  } 

  _setLoggedInUserData(data: any) {
    localStorage.setItem('userData', JSON.stringify([data]));
  }
  // this method is gives the loggedin user data
  _getLoggedInUserData() {
    return localStorage.getItem('userData');
  }

  openSnackBar(
    snackmsg: any,
    snackaction: any,
    snackHorizontal: MatSnackBarHorizontalPosition,
    snackVertical: MatSnackBarVerticalPosition
  ) {
    this.snackbar.open(snackmsg, snackaction, {
      horizontalPosition: snackHorizontal,
      verticalPosition: snackVertical,
    });
  }

  Get_Customer_All_Orders(){
    try {
      return this.http.get<any>(this.baseURL+this.getAllOrderUrl,{headers: new HttpHeaders({'ngrok-skip-browser-warning': 'skip-browser-warning', 'Access-Control-Allow-Origin': '*'})})
    } catch (error:any) {
      return throwError(() => new Error(error))
    }
  }
  Get_Order_Detail_By_Id(order_id:any){
    try {
      return this.http.get<any>(this.baseUrl+this.getOrderByIdUrl,{headers: new HttpHeaders({'ngrok-skip-browser-warning': 'skip-browser-warning', 'Access-Control-Allow-Origin': '*',"order_id":order_id})})
    } catch (error:any) {
      return throwError(() => new Error(error))
    }
  }
}
