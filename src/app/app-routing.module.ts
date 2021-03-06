import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {SignupComponent} from './auth/singup/signup.component';
import {LoginComponent} from './auth/login/login.component';
import {AuthGuard} from './shared/services/auth.guard';
import {LoginSignupGuard} from './shared/services/login-signup.guard';
import {CreatePostComponent} from './home/create-post/create-post.component';
import {EditPostComponent} from './home/edit-post/edit-post.component';
import {PostInfoComponent} from './home/post-info/post-info.component';
import {EditPostGuard} from './shared/services/edit-post.guard';



export const routes: Routes = [
  {path: '', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent, canActivate: [LoginSignupGuard]},
  {path: 'signup', component: SignupComponent, canActivate: [LoginSignupGuard]},
  {path: 'create-post', component: CreatePostComponent, canActivate: [AuthGuard]},
  {path: 'edit-post/:id', component: EditPostComponent, canActivate: [AuthGuard, EditPostGuard]},
  {path: 'post-info/:id', component: PostInfoComponent, canActivate: [AuthGuard]},
  {path: '**', redirectTo: '/login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard, LoginSignupGuard, EditPostGuard]
})
export class AppRoutingModule {
}
