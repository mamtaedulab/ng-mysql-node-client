import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class MyserviceService {

  private baseUrlMyData = 'http://localhost:3001/api/myData'
  private baseUrlBlogs='http://localhost:3001/api/blogs'
  constructor(private _http:HttpClient) { }


  //myData Services
  sendData(userData){
    return this._http.post<any>(`${this.baseUrlMyData}`,userData)
  }
  sendImg(formData){
    return this._http.post<any>(`${this.baseUrlMyData}/img`,{"formData":formData,})
  }

  getData(){
    return this._http.get(`${this.baseUrlMyData}/getAllData`);
  }
  getIndividualData(id){
    return this._http.get(`${this.baseUrlMyData}/getValue?data_id=`+id);
  }
  deleteData(id){
    return this._http.get(`${this.baseUrlMyData}/getDeleteValue?data_id=`+id);
  }
  updateData(formdata){
    return this._http.post(`${this.baseUrlMyData}/getUpdateValue`,{'updateData':formdata})

  }


  // blogs Services

  addBlogData(formData){
    return this._http.post(`${this.baseUrlBlogs}`,{data:formData})
  }
  getBlogData(){
    return this._http.get(`${this.baseUrlBlogs}/getAllBlogs`);
  }
  deleteBlogData(id){
    return this._http.get(`${this.baseUrlBlogs}/getdeleteBlogData?blogID=`+id)
  }

  getIndividualBlogData(id){
    return this._http.get(`${this.baseUrlBlogs}/getAllBlogs?blogId=`+id)
  }

}
