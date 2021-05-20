import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import {Subject, Subscription} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {ColorChangeService} from '../services/colorChange.servise';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {

  isAuth: boolean;
  email: string;
  isVisible: boolean;
  authSubscription: Subscription;
  notifier = new Subject();
  color: object;

  constructor(public authService: AuthService,
              private router: Router,
              private colorChangeService: ColorChangeService) {
  }

  ngOnInit(): void {
    this.authSubscription = this.authService.getCurrentUser().pipe(takeUntil(this.notifier)).subscribe(res => {
      if (res) {
        this.email = res.email;
        this.isAuth = !!res.uid;
      } else {
        this.isAuth = false;
      }
    });
    this.isVisible = false;
    this.colorChangeService.updateColor().pipe(takeUntil(this.notifier)).subscribe(color => this.color = color);
  }

  ngOnDestroy(): void {
    this.notifier.next();
    this.notifier.complete();
  }

  logout(): void {
    this.authService.logout().then(() => {
      this.router.navigate(['/login']);
    });
    this.isVisible = false;
  }

}
