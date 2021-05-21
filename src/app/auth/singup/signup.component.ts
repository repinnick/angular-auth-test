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
    from(this.authService.signUp(user))
      .pipe(
        takeUntil(this.notifier),
        switchMap((user: User) => this.authService.checkAdmin(user.email))
      )
      .subscribe(() => this.router.navigate(['/']),
        error1 => this.error = error1.message);
  }

  googleAuth(): void {
    from(this.authService.googleAuth())
      .pipe(
        takeUntil(this.notifier),
        switchMap((user: User) => this.authService.checkAdmin(user.email))
      )
      .subscribe(() => this.router.navigate(['/']),
        error1 => this.error = error1.message);
  }

  facebookAuth(): void {
    from(this.authService.facebookAuth())
      .pipe(
        takeUntil(this.notifier),
        switchMap((user: User) => this.authService.checkAdmin(user.email))
      )
      .subscribe(() => this.router.navigate(['/']),
        error1 => this.error = error1.message);
  }

  githubAuth(): void {
    from(this.authService.githubAuth())
      .pipe(
        takeUntil(this.notifier),
        switchMap((user: User) => this.authService.checkAdmin(user.email))
      )
      .subscribe(() => this.router.navigate(['/']),
        error1 => this.error = error1.message);
  }

  ngOnDestroy(): void {
    this.notifier.next();
    this.notifier.complete();
  }
}
