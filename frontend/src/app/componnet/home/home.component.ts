import { Component } from '@angular/core';

interface Blog {
  title: string;
  content: string;
  date: Date;
  author: string;
  authorId?: string;
}

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  blogs:number[] = [1,2,3,4,5,6,7,8,9,10];
}
