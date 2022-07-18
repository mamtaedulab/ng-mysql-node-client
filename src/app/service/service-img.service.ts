import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ServiceImgService {

  _url='http://localhost:3001/api/myData/img'
  constructor(private _http:HttpClient) { }

  sendData(userData){
    return this._http.post<any>(this._url,userData)
  }

}
