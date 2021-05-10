import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";
import {Subscription} from "rxjs";

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

  constructor(public authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    this.authSubscription = this.authService.getCurrentUser().subscribe(res => {
      if (res) {
        this.email = res.email;
        this.isAuth = !!res.uid;
      }
      else {
        this.isAuth = false;
      }
    })
    this.isVisible = false;
  }

  ngOnDestroy() {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe()
    }
  }

  logout() {
    this.authService.logout().then(() => {
      this.router.navigate(['/login'])
    })
    this.isVisible = false;
  }

}
