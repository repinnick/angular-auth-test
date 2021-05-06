import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {SignupComponent} from "./auth/singup/signup.component";
import {LoginComponent} from "./auth/login/login.component";
// import {AngularFireAuthGuard} from "@angular/fire/auth-guard";
import {AuthGuard} from "./shared/services/auth.guard";
import {LoginSignupGuard} from "./shared/services/login-signup.guard";



const routes: Routes = [
  // {path: "", component: HomeComponent, canActivate: [AngularFireAuthGuard]},
  {path: "", component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent, canActivate: [LoginSignupGuard]},
  {path: 'signup', component: SignupComponent, canActivate: [LoginSignupGuard]},
  {path: '**', redirectTo: '/login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard, LoginSignupGuard]
})
export class AppRoutingModule {}
