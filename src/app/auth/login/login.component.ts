import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../../shared/services/auth.service';
import {User} from '../../shared/interfaces';
import {from, Subject} from 'rxjs';
import {switchMap, takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  form: FormGroup;
  error: string;
  notifier = new Subject();

  constructor(public authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
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

    from(this.authService.signIn(user))
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
