import { Component, ViewChild, OnInit,AfterViewInit} from '@angular/core';
import { FormBuilder, Validators, AbstractControl, FormGroup } from '@angular/forms';
import { FileUpload } from 'primeng/fileupload';
import { MyserviceService } from '../../service/myservice.service';

import { Router } from '@angular/router';
import {FileUploadService} from '../../@core/backend/common/services/file-upload.service'
import { HttpEvent, HttpEventType } from '@angular/common/http';
import {NbToastrService} from '@nebular/theme'
import { MatDatepicker } from '@angular/material/datepicker';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {Moment } from 'moment';
import {DateAdapter,MAT_DATE_FORMATS,MAT_DATE_LOCALE}from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { PreviewComponent } from '../../dialog/preview/preview.component'


//defining Date Format
export const YEAR_MODE_FORMATS = {
  parse: {
    dateInput: 'YYYY',
  },
  display: {
    dateInput: 'YYYY',
    monthYearLabel: 'YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'YYYY',
  },
};

@Component({
  selector: 'ngx-my-cmp',
  templateUrl: './my-cmp.component.html',
  styleUrls: ['./my-cmp.component.scss'],
  //For Date
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'pt' },
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE],
    },
    { provide: MAT_DATE_FORMATS, useValue: YEAR_MODE_FORMATS },
    
  ],
})

export class MyCmpComponent implements OnInit {

  constructor(private fb: FormBuilder,
    private myService: MyserviceService,
    public fileUploadService: FileUploadService,
    private toastrService: NbToastrService,
    protected router: Router,

    private dialogRef:MatDialog
    ) { 
    const currentYear = new Date().getFullYear();
    this.maxDate = new Date(currentYear , 11, 31);
    }


  @ViewChild('fileInput') fileInput!: FileUpload;

  uploadedFiles: any[] = [];
  program: String[] = ['UG', 'PG', 'PHD', 'PROFESSIONAL'];
  MyForm: FormGroup;
  image: any;
  video: any;
  file_name: any;
  years:String[]=[];
  y:any;
  myDate:any;
  Images:File;
  Videos:any;
  progress: number = 0;
  maxDate: Date;
  urlImg:any;
  urlVid:any;
  ngOnInit(): void {
    this.MyForm = this.fb.group({
      name: ['', [Validators.required]],
      photo: ['', [Validators.required]],
      video: ['', [Validators.required]],
      about: ['', [Validators.required]],
      institution: ['', [Validators.required]],
      university: ['', [Validators.required]],
      yearOfpassing: ['', [Validators.required]],
      programName: ['', [Validators.required]],
      stream: ['', [Validators.required]],
      location: ['', [Validators.required]]
    })
  }

  get form(): { [key: string]: AbstractControl; } {
    return this.MyForm.controls;
  }
  get programName() {return this.MyForm.get('programName');}
  
  //to set the value after selecting value from the dropdown list
  changeProgram(e: any) {
    this.MyForm.controls['programName'].setValue(e.target.value, {
      onlySelf: true,
    });
  }


//fetching date after selection
  _yearSelectedHandler(chosenDate: Moment, datepicker: MatDatepicker<Moment>) {
    datepicker.close();
    chosenDate.set({ date: 1 });
    this.myDate=chosenDate.year().toString()
    this.MyForm.controls['yearOfpassing'].setValue(chosenDate);
    console.log(this.MyForm.get('yearOfpassing')?.value)
   
  }
 

  onSubmit() {
      console.log(this.myDate)
      const formdata = {
      'name':this.MyForm.controls['name'].value,
      'photo': this.MyForm.get('photo')?.value,
     'video': this.MyForm.get('video')?.value,
      'about': this.MyForm.get('about')?.value,
      'institution': this.MyForm.get('institution')?.value,
      'university':this.MyForm.get('university')?.value,
     'yearOfpassing':this.myDate,   
     'programName': this.MyForm.get('programName')?.value,
      'stream': this.MyForm.get('stream')?.value,
      'location': this.MyForm.get('location')?.value,
      }
    //console.log(formdata)
   const fomData=new FormData()
   fomData.append('file',this.Images)
   const fmData=new FormData()
   fmData.append('video',this.Videos)

   this.myService.sendData(formdata).subscribe(data =>{
    if(data['status'] == 200){
      this.fileUploadService
      .uploadFile(data['data'], this.Images,false,'/myData/img')
      .subscribe((event: HttpEvent<any>) => {
        switch (event.type) {
          case HttpEventType.Sent:
            console.log('Request has been made!');
            break;
          case HttpEventType.ResponseHeader:
            console.log('Response header has been received!');
            break;
          case HttpEventType.UploadProgress:
            this.progress = Math.round((event.loaded / event.total) * 100);
            console.log(`Uploaded! ${this.progress}%`);
            //this.toastrService.success(`Uploaded! ${this.progress}%`, 'Status')
            break;
          case HttpEventType.Response:
            //console.log('User successfully created!', event.body);
            this.toastrService.success('File Uploaded successfully', 'Status')
            setTimeout(() => {
              this.progress = 0;
              // this.router.navigate(['auth/login'])
            }, 1500);
        }
      });
      this.fileUploadService
      .uploadVideo(data['data'], 'vdo' , this.Videos)
      .subscribe((event: HttpEvent<any>) => {
        switch (event.type) {
          case HttpEventType.Sent:
            console.log('Request has been made!');
            break;
          case HttpEventType.ResponseHeader:
            console.log('Response header has been received!');
            break;
          case HttpEventType.UploadProgress:
            this.progress = Math.round((event.loaded / event.total) * 100);
            this.toastrService.success(`Uploaded! ${this.progress}%`, 'Status')
            break;
          case HttpEventType.Response:
            console.log('User successfully created!', event.body);
            this.toastrService.success('File Uploaded successfully', 'Status')
          }
      });
    }else{
      this.toastrService.danger('Error : '+data['message'], 'Status')
    }
  })
  }

  onSelect(event: any) { 
    this.Images = (event.target as HTMLInputElement).files[0]; 
    if (event.target.files.length > 0) {
      const file = event.target.files[0]     
      this.image = event.target.files[0].name;
      this.Images=file;
    //for finding url of image/video for showing preview
    var reader= new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload=()=>{
      this.urlImg=reader.result as string;
    }
      this.MyForm.controls['photo'].setValue(this.image);
    }
  }

  onSelectVideo(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0]
     this.video =event.target.files[0].name;
      this.Videos=file;
    //for finding url of image/video for showing preview
    var reader= new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload=()=>{
      this.urlVid=reader.result as string;
    }
      this.MyForm.controls['video'].setValue(this.video);
    }
  }

  onView(mediaUrl,type){
    this.dialogRef.open(PreviewComponent,{
      data:{
        url: mediaUrl,
        value:type
      }
    })
}

backtoprograms(){
  this.router.navigate(['pages/alldata']);
}

}