import {Component, OnInit} from '@angular/core';
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isVisible: boolean

  constructor(private authService: AuthService, private router: Router) {

  }

  ngOnInit(): void {
    this.authService.getData().subscribe(res => {
      this.isVisible = !!(res && res.uid);
      if (!this.isVisible) {
        this.router.navigate(['/login'])
      }
    })
  }

  logout() {
    this.authService.logout()
    this.router.navigate(['/login'])
  }
}
