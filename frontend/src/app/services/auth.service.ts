import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl || 'http://localhost:8080/api/v1/';
  private isLoggedIn = new BehaviorSubject<boolean>(this.hasToken());
  constructor(private http:HttpClient, private router:Router) { }
  
  get isLoggedIn$():Observable<boolean> {
    return this.isLoggedIn.asObservable();
  }

  getToken():string | null {
    return localStorage.getItem('token');
  }

  hasToken():boolean {
    return !!this.getToken();
  }
  logIn(email:String,password:String){
    return this.http.post(this.apiUrl + '/signin', { email, password });
  }
  signUp(name:String,email:String,password:String){
    return this.http.post(this.apiUrl + '/signup', { name, email, password });
  }
  logOut():void{
    localStorage.removeItem('token');
    this.isLoggedIn.next(false);
    this.router.navigate(['/login']);
    
  }
}
