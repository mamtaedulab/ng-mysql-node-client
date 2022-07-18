import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA ,MatDialogRef} from '@angular/material/dialog';
import { Inject } from '@angular/core';
@Component({
  selector: 'ngx-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']
})
export class PreviewComponent implements OnInit {
  url:any;
  type:any;
  firstname;
 
  constructor(@Inject(MAT_DIALOG_DATA) public data , private ref:MatDialogRef<PreviewComponent>) { 
    this.url=data.url
    this.type=data.value
    console.log(this.url)
    console.log(this.type)
  }

  ngOnInit(): void {
  }
  onClose(){
    this.ref.close()
  }

}
