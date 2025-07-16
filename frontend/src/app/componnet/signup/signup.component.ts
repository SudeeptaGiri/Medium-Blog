import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import {Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: false,
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  signupForm!: FormGroup;
  errorMessage: string | null = null;
  constructor(private fb:FormBuilder,private auth:AuthService, private router:Router) {}
  ngOnInit() {
    this.signupForm = this.fb.group({
      name: ['',[Validators.required, Validators.minLength(3),Validators.maxLength(50)]],
      email: ['',[Validators.required, Validators.email]],
      password: ['',[Validators.required, Validators.minLength(6),Validators.maxLength(50)]]
    });
  }

  onSubmit() {
    if (this.signupForm.valid) {
      this.auth.signUp(
        this.signupForm.value.name,
        this.signupForm.value.email,
        this.signupForm.value.password
      ).subscribe({
        next: (response:any) => {
          console.log('Sign up successful', response);
          this.router.navigate(['/home']);
          localStorage.setItem('token', response.token); 
        },
        error: (error) => {
          console.error('Sign up failed', error);
          this.errorMessage = error;
        }
      });
    } else {
      this.errorMessage = 'Please fill out the form correctly.';
      console.error('Form is invalid');
    }
  }

}
