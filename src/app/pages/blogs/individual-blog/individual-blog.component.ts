import { Component, OnInit } from '@angular/core';
import { PreviewComponent } from '../../../dialog/preview/preview.component';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { MyserviceService } from '../../../service/myservice.service';
import { FileUploadService } from '../../../@core/backend/common/services/file-upload.service';
import {Router,ActivatedRoute} from '@angular/router'
import * as moment from 'moment';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import {NbToastrService} from '@nebular/theme'

@Component({
  selector: 'ngx-individual-blog',
  templateUrl: './individual-blog.component.html',
  styleUrls: ['./individual-blog.component.scss']
})
export class IndividualBlogComponent implements OnInit {

  constructor(private fb:FormBuilder, private dialogRef:MatDialog, private router:Router,private route:ActivatedRoute,
              private MyService:MyserviceService,private fileUploadService:FileUploadService,
              private toastrService:NbToastrService) { }

  //variable declaration
  MyBlog:any;
  Images:File;
  urlImg:any;
  progress:any;
  blogId:any;
  blogData:any;
  imageDirectoryPath: any = 'http://localhost:3001/api/blogs/'
  randomTime:any

  loadTime:any;
  loadDate:any;
  selectImage:boolean;
  msg:boolean;
  ngOnInit(): void {
    
    this.MyBlog = this.fb.group({
      title:['',[Validators.required]],
      dateOfPublishing:['',Validators.required],
      authorName:['',Validators.required],
      readingTime:['',Validators.required],
      summary:['',Validators.required],
      image:['',Validators.required]
    })
    this.blogId=this.route.snapshot.queryParamMap.get('id');
   console.log("blog....ID",this.blogId)
   this.refresh()
  }


  get form(): { [key: string]: AbstractControl; } {
    return this.MyBlog.controls;
  }
  // get title(){ return this.MyBlog.get('title')}
  // get author() {return this.MyBlog.get('authorName')}
  // get summary(){ return this.MyBlog.get('summary')}
  // get readTime(){return this.MyBlog.get('readingTime')}
  // get publishDate(){ return this.MyBlog.get('dateOfPublishing')}

  refresh(){
    if(this.blogId != null){
      this.MyService.getIndividualBlogData(this.blogId).subscribe(data=>{
        this.blogData=data['data']
        console.log("blogs,.......",this.blogData)
        this.MyBlog.get('image').setValue(this.blogData.image)
        this.urlImg=this.imageDirectoryPath+this.blogData.id +"/"+this.blogData.image;
        this.selectImage=false;
        this.randomTime="01/01/1970 " + this.blogData.reading_time+":00";
        this.loadTime= new Date(this.randomTime)
        this.loadDate=new Date(this.blogData.date_of_publishing)
        console.log(this.loadDate)
      })
    }
   
  }

  onSelectImage(event){
   
    this.selectImage=true;
    this.Images = (event.target as HTMLInputElement).files[0]; 
    if (event.target.files.length > 0) {
      this.Images=event.target.files[0]
      console.log(this.Images.type)
      if(this.Images.type == "image/jpg" || this.Images.type == "image/jpeg" ||this.Images.type == "image/png"){
        this.msg=false;
        this.MyBlog.controls['image'].setValue(this.Images);
        //for preview of image
        var reader= new FileReader();
        reader.readAsDataURL(event.target.files[0]);
         reader.onload=()=>{
        this.urlImg=reader.result as string;
      }
    }else{
      this.MyBlog.controls['image'].setValue("");
      this.msg=true
    }
      
    }
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

  onSubmit(){
    console.log(this.MyBlog.get('readingTime')?.value)
    const LT=moment(this.MyBlog.get('readingTime')?.value).format('LT')
    const time=LT.split(" ")[0]
    
    const FormData={
      'title':this.MyBlog.get('title')?.value,
      'dateOfPublishing':moment(this.MyBlog.get('dateOfPublishing')?.value).format('L'),
      'authorName':this.MyBlog.get('authorName')?.value,
      'readingTime':time,
      'summary':this.MyBlog.get('summary')?.value,
      'id':this.blogId,
      'selectImage':this.selectImage
    }
    console.log(FormData)
    this.MyService.addBlogData(FormData).subscribe(data=>{
      if(data['status'] == 200){
        if(this.selectImage==true){
          this.fileUploadService
          .uploadFile(data['data'], this.Images,false,'/blogs/img')
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
                // this.toastrService.success(`Uploaded! ${this.progress}%`, 'Status')
                break;
              case HttpEventType.Response:
                console.log('User successfully created!', event.body);
                this.toastrService.success('File Uploaded successfully', 'Status')
                setTimeout(() => {
                  this.progress = 0;
                  // this.router.navigate(['auth/login'])
                }, 1500);
            }
          });
        }
      
      }
      })
 }
  backtoprograms(){
    this.router.navigate(['pages/blogs']);
  }

}
