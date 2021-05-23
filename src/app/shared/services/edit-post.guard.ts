import {Injectable} from '@angular/core';
import {ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Params, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from './auth.service';
import {PostService} from './post.service';
import {map, switchMap} from 'rxjs/operators';
import {Post} from '../interfaces';

@Injectable()
export class EditPostGuard implements CanActivate {
  constructor(private authService: AuthService,
              private postService: PostService,
              private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const post = this.postService.post;
    if (post && post.isModeration && (post.author === this.authService.user.email || this.authService.user.isAdmin)) {
      return true;
    } else {
      this.router.navigate(['/']);
      return false;
    }
  }
}
