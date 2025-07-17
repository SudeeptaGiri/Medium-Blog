import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BlogService } from '../../services/blog.service';

@Component({
  selector: 'app-create-blog',
  standalone: false,
  templateUrl: './create-blog.component.html',
  styleUrl: './create-blog.component.css'
})
export class CreateBlogComponent {
  creatBlog!:FormGroup;
  errorMessage: string| null = null;
  constructor(private fb:FormBuilder, private router:Router, private blog:BlogService) { }

  ngOnInit(): void {
    this.creatBlog = this.fb.group({
      title: ['',[Validators.required, Validators.minLength(3)]],
      content: ['', [Validators.required, Validators.minLength(20)]]
    });
  }

  onPublish() {
    if (this.creatBlog.valid) {
      this.blog.createBlog(this.creatBlog.value.title, this.creatBlog.value.content, true).subscribe({
        next: (response) => {
          console.log('Blog created successfully:', response);
          this.router.navigate(['/home']);
          this.errorMessage = null; 
        },
        error: (error) => {
          console.error('Error creating blog:', error);
          this.errorMessage = 'Failed to create blog. Please try again.';
        }
      });
      
    } else {
      console.log('Form is invalid');
      this.errorMessage = 'Please fill out all required fields correctly.';

    }
  }
  onSaveDraft() {
    if (this.creatBlog.valid) {
       this.blog.createBlog(this.creatBlog.value.title, this.creatBlog.value.content, false).subscribe({
        next: (response) => {
          console.log('Blog Saved as draft successfully:', response);
          this.router.navigate(['/home']);
          this.errorMessage = null; 
        },
        error: (error) => {
          console.error('Error creating blog:', error);
          this.errorMessage = 'Failed to create blog. Please try again.';
        }
      });
    } else {
      console.log('Form is invalid');
      this.errorMessage = 'Please fill out all required fields correctly.';
    }
  }

}
