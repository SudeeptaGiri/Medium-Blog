import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BlogComponent } from './componnet/blog/blog.component';
import { CreateBlogComponent } from './componnet/create-blog/create-blog.component';
import { ReadBlogComponent } from './componnet/read-blog/read-blog.component';
import { HomeComponent } from './componnet/home/home.component';
import { LoginComponent } from './componnet/login/login.component';
import { SignupComponent } from './componnet/signup/signup.component';


import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    AppComponent,
    BlogComponent,
    CreateBlogComponent,
    ReadBlogComponent,
    HomeComponent,
    LoginComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
