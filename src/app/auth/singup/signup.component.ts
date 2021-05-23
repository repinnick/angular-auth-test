import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {User} from '../../shared/interfaces';
import {AuthService} from '../../shared/services/auth.service';
import {switchMap, takeUntil} from 'rxjs/operators';
import {from, Subject} from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit, OnDestroy {

  form: FormGroup;
  error: string;
  notifier = new Subject();

  constructor(private router: Router, public authService: AuthService) {
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('', [
        Validators.email,
        Validators.required,
        Validators.pattern(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
      ]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  submit(): void {
    if (this.form.invalid) {
      return;
    }
    const user: User = {
      email: this.form.value.email,
      password: this.form.value.password,
    };
    this.authService.signUp(user)
      .then(() => this.router.navigate(['/']))
      .catch(err => this.error = err.message);
  }

  googleAuth(): void {
    this.authService.googleAuth()
      .then(() => this.router.navigate(['/']))
      .catch(err => this.error = err.message);
  }

  facebookAuth(): void {
    this.authService.facebookAuth()
      .then(() => this.router.navigate(['/']))
      .catch(err => this.error = err.message);
  }

  githubAuth(): void {
    this.authService.githubAuth()
      .then(() => this.router.navigate(['/']))
      .catch(err => this.error = err.message);
  }

  ngOnDestroy(): void {
    this.notifier.next();
    this.notifier.complete();
  }
}
