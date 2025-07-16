import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

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
  constructor(private router:Router, private auth:AuthService) {}
  onCreate() {
    this.router.navigate(['/create']);
  }
  onLogOut() {
    this.auth.logOut();
  }

}
