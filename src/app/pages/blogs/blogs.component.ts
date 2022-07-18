import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router'
import { MyserviceService } from '../../service/myservice.service';
import { PreviewComponent } from '../../dialog/preview/preview.component';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'ngx-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.scss']
})
export class BlogsComponent implements OnInit {

  constructor(protected router: Router, private myService: MyserviceService, private dialogRef: MatDialog) { }

  //variable declaration
  public filterInput = new FormControl();
  public filterText: string;
  filterPlaceholder: any;
  isLoadingResults: boolean = false;
  allBlogs: any;
  page: number = 1;
  imageDirectoryPath: any = 'http://localhost:3001/api/blogs/'

  ngOnInit(): void {
    this.filterPlaceholder = "Search";
    this.filterText = "";
    this.refresh()
  }

  refresh() {
    this.isLoadingResults = true;
    this.myService.getBlogData().subscribe(data => {
      this.isLoadingResults = false;
      this.allBlogs = data['data'];
      console.log(this.allBlogs)
    })
    this.filterInput
      .valueChanges
      .subscribe(term => {
        this.filterText = term;
        console.log('filterInput', term)
      });
  }

  addDetails(userId,value) {
    if (value == 'add') {
      this.router.navigate(['/pages/individual-blog']);
    }
    else if (value == 'edit') {
      this.router.navigate(['/pages/individual-blog'],{queryParams:{id:userId}});
    }
  }

  deleteDetail(id) {
    this.myService.deleteBlogData(id).subscribe(data=>{
      console.log(data)
      this.refresh();
    })
  }

  onTableDataChange(event: any) {
    this.page = event;
  }

  onView(name, path, id, type) {

    this.dialogRef.open(PreviewComponent, {
      data: {
        url: path + id +'/'+ name,
        value: type
      }
    })
  }
}


