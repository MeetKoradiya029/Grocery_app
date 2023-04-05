import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class EncryptionService {

  baseURL= environment.baseURL;
  encryptionUrl = environment.encryptId

  constructor(private http:HttpClient) {}

  encryptId(id:any){
    try {
      return this.http.get<any>(this.baseURL+this.encryptionUrl,{
        headers:new HttpHeaders({'ngrok-skip-browser-warning': 'skip-browser-warning', 'Access-Control-Allow-Origin': '*','id':id})
      })
    } catch (error:any) {
      return throwError(()=>new Error(error))
    }
  }
}
