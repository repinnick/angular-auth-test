import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {User} from "../../shared/interfaces";
import {AuthService} from "../../shared/services/auth.service";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  form : FormGroup;

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl("", [
        Validators.email,
        Validators.required,
        Validators.pattern(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
      ]),
      password: new FormControl("", [Validators.required, Validators.minLength(6)])
    })
  }

  submit() {
    if (this.form.invalid) return;
    const user: User = {
      email: this.form.value.email,
      password: this.form.value.password,
    };
    this.authService.signUp(user)
  }

  googleAuth() {
    this.authService.googleAuth()
  }

  facebookAuth() {
    this.authService.facebookAuth()
  }
}
