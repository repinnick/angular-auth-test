import {Component, OnInit} from '@angular/core';
import {AuthService} from "../shared/services/auth.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  email: string = ""

  constructor(private authService: AuthService) {

  }

  ngOnInit(): void {
    this.authService.getData().subscribe(res => {
      if(res && res.email) {
        this.email = res.email;
      }
    }, error => console.log(error.message))
  }

}
