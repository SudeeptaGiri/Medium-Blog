import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { BlogService } from '../../services/blog.service';
import Blog from '../../model/blog.model';



@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  blogs:Blog[] = [];
  constructor(private router:Router, private auth:AuthService, private blog:BlogService) {}

  ngOnInit(){
    this.blog.getAllBlogs().subscribe({
      next: (data:any) => {
        console.log('Blogs fetched successfully:', data.blogs);
        this.blogs = data.blogs;
      },
      error: (error:any) => {
        console.error('Error fetching blogs:', error);
      }
    })
  }
  onCreate() {
    this.router.navigate(['/create']);
  }
  onLogOut() {
    this.auth.logOut();
  }

}
