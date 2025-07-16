import { Component} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm!:FormGroup
  errorMessage: string | null = null;
  constructor(private fb:FormBuilder, private auth:AuthService, private router:Router){}
  ngOnInit(){
    console.log("Login Component Initialized");
    this.loginForm = this.fb.group({
      email: ['',[Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
  onSubmit() {
    if (this.loginForm.valid) {
      console.log('Form Submitted!', this.loginForm.value);
      this.auth.logIn(this.loginForm.value.email, this.loginForm.value.password).subscribe({
        next: (response:any) => {
          console.log('Login successful', response);
          // Handle successful login, e.g., redirect to dashboard
          this.errorMessage = null; // Clear any previous error message
          this.router.navigate(['/home']);
          localStorage.setItem('token', response.token); // Assuming the response contains a token
        },
        error: (error) => {
          console.error('Login failed', error);
          this.errorMessage = 'Invalid email or password. Please try again.';
        }
      });
      
    } else {
      this.errorMessage = 'Please fill out the form correctly.';
      console.log("Form is invalid");
    }
  }
}
