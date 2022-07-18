import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';


@Injectable({
  providedIn: 'root',
})

export class FileUploadService {
  constructor(private http: HttpClient) {}

  uploadFile(id: number, profileImage: File,errataFlag:Boolean,path:string): Observable<any> {
    var formData: any = new FormData();
    formData.append('id', id);
    formData.append('errataFlag', errataFlag);
    formData.append('avatar', profileImage);

    var url = environment.apiUrl+path;
    // console.log("url",url)
    // console.log('id',id)
    // console.log('avatar',profileImage)
    return this.http
      .post(url, formData, {
        reportProgress: true,
        observe: 'events',
      })
      .pipe(catchError(this.errorMgmt));
  }

  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(() => {
      return errorMessage;
    });
  }

  uploadVideo(id: number, upload_option: string, videoResourse: File): Observable<any> {
    var formData: any = new FormData();
    formData.append('id', id);
    formData.append('upload_option', upload_option);
    formData.append('avatar', videoResourse);

    var url = environment.apiUrl+'/myData/video';
    return this.http
      .post(url, formData, {
        reportProgress: true,
        observe: 'events',
      })
      .pipe(catchError(this.errorMgmt));
  }
}
