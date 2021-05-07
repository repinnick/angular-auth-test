import {Component, OnInit} from '@angular/core';
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  isAuth: boolean;

  constructor(public authService: AuthService) {
  }

  ngOnInit(): void {
    this.authService.getCurrentUser().subscribe(res => {
      if (res) {
        this.isAuth = !!res.uid;
      }
      else {
        this.isAuth = false;
      }
    })
  }

  logout() {
    this.authService.logout()
  }
}
