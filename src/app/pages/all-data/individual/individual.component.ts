import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, AbstractControl, FormGroup } from '@angular/forms';
import { MatDatepicker } from '@angular/material/datepicker';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {Moment } from 'moment';
import {DateAdapter,MAT_DATE_FORMATS,MAT_DATE_LOCALE}from '@angular/material/core';
import { HttpClient} from '@angular/common/http';
import * as _moment from 'moment';
import * as moment from 'moment';
import { Router,ActivatedRoute } from '@angular/router';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { MyserviceService } from '../../../service/myservice.service';
import {FileUploadService} from '../../../@core/backend/common/services/file-upload.service'
import {NbToastrService} from '@nebular/theme'
import { AnyTypeAnnotation } from '../../../../../old_node_modules/@babel/types/lib';

import { MatDialog } from '@angular/material/dialog';
import { PreviewComponent } from '../../../dialog/preview/preview.component'

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
}

@Component({
  selector: 'ngx-individual',
  templateUrl: './individual.component.html',
  styleUrls: ['./individual.component.scss'],
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
export class IndividualComponent implements OnInit {

    
  uploadedFiles: any[] = [];
  program: String[] = ['UG', 'PG', 'PHD', 'PROFESSIONAL'];
  default: String='PG';
  MyForm: FormGroup;
  submitted = false;
  image: any;
  video: any;
  file_name: any;
  years:String[]=[];
  y:any;
  myDate:any;
  Images:File;
  Videos:any;
  progress: number = 0;
  singleData:any;
  id:any;
  selectedProgram:any;
  urlImg:any;
  urlVid:any;
  maxDate:Date;
 //location of uploaded images/videos
 imageDirectoryPath:any='http://localhost:3001/api/upload/'
 videoDirectoryPath:any='http://localhost:3001/api/upload/'

 //for checking status of image 
 changeImage:boolean;
 changeVideo:boolean;

  constructor(
    private fb: FormBuilder,
    private myService: MyserviceService,
    public fileUploadService: FileUploadService,
    private toastrService: NbToastrService,
    protected router: Router,
    private http:HttpClient,
    private route: ActivatedRoute,
    private dialogRef:MatDialog
   
  ) {  const currentYear = new Date().getFullYear();
    this.maxDate = new Date(currentYear , 11, 31);}

  ngOnInit(): void {

  this.id = this.route.snapshot.queryParamMap.get('programId');
    
    this.refresh()
    
    this.MyForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      photo: ['', [Validators.required]],
      video: ['', [Validators.required]],
      about: ['', [Validators.required]],
      institution: ['', [Validators.required]],
      university: ['', [Validators.required]],
      yearOfpassing: [moment(), [Validators.required]],
      programName: [this.default, [Validators.required]],
      stream: ['', [Validators.required]],
      location: ['', [Validators.required]]
    })
    // this.default=this.singleData.program;
    
  }
  
  get form(): { [key: string]: AbstractControl; } {
    return this.MyForm.controls;
  }
  get programName() {
    return this.MyForm.get('programName');

  }
  //to set the value after selecting value from the dropdown list
  changeCity(e: any) {
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
  // console.log(this.MyForm.controls['name'].value)
  console.log('heloo')
  this.submitted = true;
  // stop the process here if form is invalid
  if (this.MyForm.invalid) {
    console.log("valid or not : ", this.MyForm.invalid)
    return;
  }
  else {
    const fData = {
      'name':this.MyForm.get('name')?.value,
      'photo': this.MyForm.get('photo')?.value,
     'video': this.MyForm.get('video')?.value,
      'about': this.MyForm.get('about')?.value,
      'institution': this.MyForm.get('institution')?.value,
      'university':this.MyForm.get('university')?.value,
     'yearOfpassing':this.myDate,
     'programName': this.MyForm.get('programName')?.value,
      'stream': this.MyForm.get('stream')?.value,
      'location': this.MyForm.get('location')?.value,
      'id':this.id,
      'selectImg':this.changeImage,
      'selectVid':this.changeVideo
      }
console.log(fData)

 const formData=new FormData()
 formData.append('file',this.Images)
 const fmData=new FormData()
 fmData.append('video',this.Videos)

 this.myService.updateData(fData).subscribe(data =>{
  if(data['status'] == 200){
    console.log(data)
    if(this.changeImage==true){
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
    }
   if(this.changeVideo==true){
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
          //this.progress = Math.round((event.loaded / event.total) * 100);
          //this.toastrService.success(`Uploaded! ${this.progress}%`, 'Status')
          break;
        case HttpEventType.Response:
          //console.log('User successfully created!', event.body);
          this.toastrService.success('File Uploaded successfully', 'Status')
        }
    });
   }   
  }else{
    this.toastrService.danger('Error : '+data['message'], 'Status')
  }
})
  }
}

// uploadFile(event) {
//   this.Images = (event.target as HTMLInputElement).files[0]; 
// }

//for selecting image
onSelectImage(event: any) {
  this.changeImage=true;

  this.Images = (event.target as HTMLInputElement).files[0]; 
  if (event.target.files.length > 0) {
    const file = event.target.files[0]
    console.log("new data", file)      
    this.file_name = event.target.files[0].name;
    this.image = this.file_name;
    this.Images=file;
    console.log("image:",this.file_name)   
    //for preview of image
    var reader= new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload=()=>{
      this.urlImg=reader.result as string;
    }
    this.MyForm.controls['photo'].setValue(this.image);
  }
}
//for selecting video
onSelectVideo(event: any) { 
 
  this.changeVideo=true;
  if (event.target.files.length > 0) {
    const file = event.target.files[0]
    this.file_name = event.target.files[0].name;
   this.video = this.file_name
    this.Videos=file;
    var reader= new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload=()=>{
    this.urlVid=reader.result as string;
    }
    
  }
  this.MyForm.controls['video'].setValue(this.video);
}

//execute at the time of loading this page
refresh(){

  this.myService.getIndividualData(this.id).subscribe(data =>{
    this.singleData = data['data'];
    console.log(this.singleData)
    this.default=this.singleData.program
    console.log('hello...',this.singleData.program)
    this.selectedProgram=this.singleData.program
    this.urlImg=this.imageDirectoryPath+this.singleData.id+'/image/'+this.singleData.image
    this.urlVid=this.videoDirectoryPath+this.singleData.id+'/video/'+this.singleData.video
    this.MyForm.controls['photo'].setValue(this.singleData.image);
    this.MyForm.controls['video'].setValue(this.singleData.video);
    this.changeImage =false;
    this.changeVideo=false;
  })
}
backtoprograms(){
  this.router.navigate(['pages/alldata']);
}

//For Showing popup
onView(mediaUrl,type){
  this.dialogRef.open(PreviewComponent,{
    data:{
      url: mediaUrl,
      value:type
    }
  })

}
}
