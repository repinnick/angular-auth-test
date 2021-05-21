import {Component, OnInit} from '@angular/core';
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
export class LoginComponent implements OnInit {
  form: FormGroup;
  error: string;
  notifier = new Subject();
  user: User;

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

    from(this.authService.signIn(user)).pipe(switchMap((user: User) => {
      return this.authService.isAdmin(user.email);
    })).subscribe(() => {
      console.log(this.authService.user);
      this.router.navigate(['/']);
    }, error1 => this.error = error1.message);
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
}
