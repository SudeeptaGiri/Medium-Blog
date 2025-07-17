import { Component } from '@angular/core';
import Blog from '../../model/blog.model';
import { BlogService } from '../../services/blog.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-read-blog',
  standalone: false,
  templateUrl: './read-blog.component.html',
  styleUrl: './read-blog.component.css'
})
export class ReadBlogComponent {
  blog!:Blog;
  constructor(private blogService:BlogService, private route:ActivatedRoute){}

  ngOnInit() {
    const blogId:string = this.route.snapshot.paramMap.get('id')?.toString()|| '';
    this.blogService.getBlogById(blogId).subscribe({
      next: (data: any) => {
        this.blog = data.blog;
        console.log('Blog fetched successfully:', this.blog);
      },
      error: (error) => {
        console.error('Error fetching blog:', error);
      }
    })
  }
}
