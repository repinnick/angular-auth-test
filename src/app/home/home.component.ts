import {Component, OnInit} from '@angular/core';
import {AuthService} from "../shared/services/auth.service";
import {User} from "../shared/interfaces";

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
    this.authService.getCurrentUser().subscribe(res => {
      if(res && res.email) {
        this.email = res.email;
      }
    }, error => console.log(error.message))
  }
}
