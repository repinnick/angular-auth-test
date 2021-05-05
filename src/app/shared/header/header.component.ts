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
    this.authService.angularFireAuth.authState.subscribe(res => {
      this.isVisible = !!(res && res.uid);
  })
  }

  ngOnInit(): void {

  }

  logout() {
    this.authService.logout()
    this.router.navigate(['/login'])
  }
}
