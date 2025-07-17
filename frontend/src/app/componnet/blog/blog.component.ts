import { BlogService } from './../../services/blog.service';
import { Component, Input } from '@angular/core';
import Blog from '../../model/blog.model';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-blog',
  standalone: false,
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.css'
})
export class BlogComponent {
  @Input() blog!: Blog; 

  constructor(private router:Router ){}

  onReadBlog(id:string|undefined){
    if(!id) {
      console.log('no id');
      return; 
    }
    this.router.navigate(['/blog', id]);
  }
}
