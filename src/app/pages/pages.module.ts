/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */

import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { PagesRoutingModule } from './pages-routing.module';
import { ThemeModule } from '../@theme/theme.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import { PagesMenu } from './pages-menu';
import { ECommerceModule } from './e-commerce/e-commerce.module';
import { NbMenuModule ,NbCardModule,NbCheckboxModule,NbSelectComponent,NbTimepickerModule} from '@nebular/theme';
import { AuthModule } from '../@auth/auth.module';
import { ExtraComponentComponent } from './extra-component/extra-component/extra-component.component';
import { NbThemeModule } from '@nebular/theme';
import { MyCmpComponent } from './my-cmp/my-cmp.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { FileUploadModule } from "primeng/fileupload";
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NbDatepickerModule} from '@nebular/theme';
import {MatDatepickerModule} from '@angular/material/datepicker'; 
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatNativeDateModule} from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { AllDataComponent } from './all-data/all-data.component';
import {MatIconModule} from '@angular/material/icon';
import { NgxPaginationModule } from 'ngx-pagination';
import { IndividualComponent } from './all-data/individual/individual.component';
import { FilterPipe } from './pipes/filter.pipe';

import { NbActionsModule } from '@nebular/theme';
import { PreviewComponent } from '../dialog/preview/preview.component';
import {NbLayoutModule ,NbInputModule,NbSelectModule, NbButtonModule} from '@nebular/theme';
import { MatDialogModule } from '@angular/material/dialog';
import { BlogsComponent } from './blogs/blogs.component';
import  {IndividualBlogComponent} from '../pages/blogs/individual-blog/individual-blog.component'
const PAGES_COMPONENTS = [
  PagesComponent,
];

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    DashboardModule,
    ECommerceModule,
    ReactiveFormsModule,
    NbMenuModule,
    NbCardModule,
    MiscellaneousModule,
    NbThemeModule,
    NbCheckboxModule, 
    NbDatepickerModule, 
    FormsModule,
    FileUploadModule,
    NgbModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatInputModule,
    MatIconModule,
    NgxPaginationModule,
    NbActionsModule,
    NbLayoutModule ,NbInputModule,NbSelectModule, NbButtonModule,
    MatDialogModule,
    NbTimepickerModule.forRoot(),
    AuthModule.forRoot(),
  ],
  declarations: [
    ...PAGES_COMPONENTS,
    ExtraComponentComponent,
    MyCmpComponent,
    AllDataComponent,
    IndividualComponent,
    FilterPipe,
    PreviewComponent,
    BlogsComponent,
    IndividualBlogComponent
  
  ],
  providers: [
    PagesMenu,
  ],
})
export class PagesModule {
}
