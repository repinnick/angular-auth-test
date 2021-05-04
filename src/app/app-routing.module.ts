import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {SingupComponent} from "./auth/singup/singup.component";
import {LoginComponent} from "./auth/login/login.component";



const routes: Routes = [
  {path: "", component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SingupComponent},
  {path: '**', redirectTo: '/login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
