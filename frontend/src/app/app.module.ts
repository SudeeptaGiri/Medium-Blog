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
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
