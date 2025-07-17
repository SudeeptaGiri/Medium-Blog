import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './componnet/home/home.component';
import { ReadBlogComponent } from './componnet/read-blog/read-blog.component';
import { LoginComponent } from './componnet/login/login.component';
import { SignupComponent } from './componnet/signup/signup.component';
import { CreateBlogComponent } from './componnet/create-blog/create-blog.component';
import { authGuard } from './guards/auth.guard';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home',component:HomeComponent, canActivate:[authGuard]},
  {path: 'create', component:CreateBlogComponent,  canActivate:[authGuard]},
  {path:'blog/:id', component:ReadBlogComponent, canActivate:[authGuard]},
  {path:'login',component:LoginComponent},
  {path:'signup', component:SignupComponent},
  {path: '**', redirectTo: '/home'} // Wildcard route for a 404 page  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
