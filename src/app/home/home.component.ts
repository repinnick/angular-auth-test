import {Component, OnInit} from '@angular/core';
import {AuthService} from "../shared/services/auth.service";
import {User} from "../shared/interfaces";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  email: string = ""
  user: User;

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    this.email = this.authService.user.email
  }
}
