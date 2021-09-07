import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  NbThemeModule,
  NbLayoutModule,
  NbSidebarModule,
  NbMenuModule,
} from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { LayoutComponent as AdminLayout } from './admin/layout/layout.component';
import { LayoutComponent as UserLayout } from './user/layout/layout.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { NebularModule } from './modules/nebular/nebular.module';
import { SigninComponent } from './authentication/signin/signin.component';
import { SignupComponent } from './authentication/signup/signup.component';
import { ResetPasswordComponent } from './authentication/reset-password/reset-password.component';
import { LayoutComponent } from './user/layout/layout.component';
import { LayoutComponent as BlogLayoutComponent } from './blog/layout/layout.component';
import { LayoutComponent as AppLayoutComponent } from './authentication/layout/layout.component';
import { HeaderComponent as BlogHeaderComponent } from './blog/header/header.component';
import { BlogHomeComponent } from './blog/blog-home/blog-home.component';
import { ViewBlogComponent } from './blog/view-blog/view-blog.component';
import { CreateBlogComponent } from './blog/create-blog/create-blog.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { MarkdownModule } from 'ngx-markdown';
import { ManageBlogComponent } from './user/manage-blog/manage-blog.component';
import { ProfileComponent } from './user/profile/profile.component';
import { NgsRevealModule } from 'ngx-scrollreveal';
import { ManageUsersComponent } from './admin/manage-users/manage-users.component';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    AppComponent,
    AdminLayout,
    UserLayout,
    DashboardComponent,
    SigninComponent,
    SignupComponent,
    ResetPasswordComponent,
    LayoutComponent,
    BlogLayoutComponent,
    BlogHeaderComponent,
    BlogHomeComponent,
    ViewBlogComponent,
    CreateBlogComponent,
    AppLayoutComponent,
    ManageBlogComponent,
    ProfileComponent,
    ManageUsersComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ChartsModule,
    NbThemeModule.forRoot({ name: 'default' }),
    NbLayoutModule,
    NbEvaIconsModule,
    NbSidebarModule.forRoot(),
    MatInputModule,
    MatFormFieldModule,
    
    ReactiveFormsModule,
    FormsModule,
    MatSelectModule,
    HttpClientModule,
    NebularModule,
    NbMenuModule.forRoot(),
    SweetAlert2Module.forRoot(),
    MarkdownModule.forRoot(),
    NgsRevealModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
