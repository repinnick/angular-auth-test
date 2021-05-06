import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../shared/services/auth.service";
import {User} from "../../shared/interfaces";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form: FormGroup
  error: string

  constructor(public authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [Validators.required, Validators.minLength(6)])
    })
  }


  submit() {
    if (this.form.invalid) return;
    const user: User = {
      email: this.form.value.email,
      password: this.form.value.password,
    };
    this.authService.signIn(user)
      .then(() => {
        this.router.navigate(['/'])
    })
      .catch(err => {
        this.error = err.message
      });
  }

  googleAuth() {
    this.authService.googleAuth()
      .then(() => {
        this.router.navigate(['/'])
      })
      .catch(err => {
        this.error = err.message
      });
  }

  facebookAuth() {
    this.authService.facebookAuth()
      .then(() => {
        this.router.navigate(['/'])
      })
      .catch(err => {
        this.error = err.message
      });
  }

  githubAuth() {
    this.authService.githubAuth()
      .then(() => {
        this.router.navigate(['/'])
      })
      .catch(err => {
        this.error = err.message
      });
  }
}
