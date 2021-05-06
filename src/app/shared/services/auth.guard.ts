import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {Observable, pipe} from "rxjs";
import {AuthService} from "./auth.service";
import {map} from "rxjs/operators";

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.getCurrentUser().pipe(map((res) => {
      if (res && res.email) return true
      else {
        this.authService.logout()
        this.router.navigate(['/login'])
      }
    }))
  }
}

