import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndividualBlogComponent } from './individual-blog/individual-blog.component';
import { NbTimepickerModule } from '@nebular/theme';


@NgModule({
  declarations: [
    IndividualBlogComponent
  ],
  imports: [
    CommonModule,
    NbTimepickerModule
  ]
})
export class BlogsModule { }
