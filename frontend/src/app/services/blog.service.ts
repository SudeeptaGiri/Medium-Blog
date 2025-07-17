import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {  Router } from '@angular/router';
import { environment } from '../../../environment';
@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private apiUrl = environment.apiUrl || 'http://localhost:8080/api/v1/blogs';
  
  constructor(private http:HttpClient, private router:Router) { }

  getHeader(){
    const token = localStorage.getItem('token')||" ";
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  getAllBlogs() {
    const headers = this.getHeader(); 
    return this.http.get(this.apiUrl+'/blog',{headers});
  }

  getBlogById(id: string) {
    const headers = this.getHeader();
    return this.http.get(`${this.apiUrl}/blog/${id}`,{headers});
  }

  createBlog(title: string, content: string, published:boolean) {
    const blogData = { title, content,published};
    const headers = this.getHeader();
    return this.http.post(this.apiUrl+'/blog', blogData,{ headers });

  }

}
