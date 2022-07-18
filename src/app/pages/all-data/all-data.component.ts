import { Component, OnInit } from '@angular/core';

import { MyserviceService } from '../../service/myservice.service';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';


import { MatDialog } from '@angular/material/dialog';
import { PreviewComponent } from '../../dialog/preview/preview.component';
@Component({
  selector: 'ngx-all-data',
  templateUrl: './all-data.component.html',
  styleUrls: ['./all-data.component.scss']
})
export class AllDataComponent implements OnInit {


  constructor(
    private myService: MyserviceService,
    private route: ActivatedRoute,
    protected router : Router,
    private dialogRef:MatDialog
  ) { }

  isLoadingResults: boolean = false;
  id:any;
  public filterInput = new FormControl();
  allData:any;
  public filterText: string;
  public filterPlaceholder: string;
  page:number=1;

  //location of uploaded images/videos
  imageDirectoryPath:any='http://localhost:3001/api/upload/'
  videoDirectoryPath:any='http://localhost:3001/api/upload/'
  


  ngOnInit(): void {
    this.filterPlaceholder = "Search";
    this.filterText = "";
    this.refresh();
   
  }

  refresh(){
    this.isLoadingResults = true;
    this.myService.getData().subscribe(data =>{
      this.isLoadingResults = false;
      this.allData = data['data'];
      console.log(this.allData)
    
    })
    this.filterInput
      .valueChanges
      .subscribe(term => {
        this.filterText = term;
        console.log('filterInput',term)
    });
  }
  addDetails(id,value){
    if(value == 'add'){
      this.router.navigate(['/pages/MyForm']);
    }else if(value == 'edit'){
      this.router.navigate(['pages/individual'],{queryParams:{programId :id }});
    }
  }

  deleteDetail(id){
    this.myService.deleteData(id).subscribe(data =>{
      this.refresh();
    });
  }
  onTableDataChange(event:any){
    this.page=event;
  }

  onView(name,path,id,type){
    if(type=='image'){
      this.dialogRef.open(PreviewComponent,{
        data:{
          url: path + id +'/image/'+ name,
          value:type
        }
      })
    }
    else{
      this.dialogRef.open(PreviewComponent,{
        data:{
          url: path + id +'/video/'+ name,
          value:type
        }
      })
    }
   
  }

}
