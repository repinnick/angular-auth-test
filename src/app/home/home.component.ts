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

  constructor(private authService: AuthService, private router: Router) {

  }

  ngOnInit(): void {
    this.authService.getCurrentUser().subscribe(res => {
      if (res && res.email) {
        this.email = res.email;
      } else {
        this.router.navigate(['/login'])
      }
    }, error => console.log(error.message))
  }
}
