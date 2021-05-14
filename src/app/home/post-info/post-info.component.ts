import {Component, OnDestroy, OnInit} from '@angular/core';
import {switchMap, takeUntil} from 'rxjs/operators';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Post} from '../../shared/interfaces';
import {PostService} from '../../shared/services/post.service';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-post-info',
  templateUrl: './post-info.component.html',
  styleUrls: ['./post-info.component.scss']
})
export class PostInfoComponent implements OnInit, OnDestroy {

  post: Post;
  error: string;
  notifier = new Subject();

  constructor(private route: ActivatedRoute,
              private postService: PostService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.route.params.pipe(
      switchMap((params: Params) => {
        return this.postService.getPostById(params.id);
      })).subscribe((post: Post) => {
      this.post = post;
    });
  }

  delete(): void {
    this.postService.deletePost(this.post.id).pipe(takeUntil(this.notifier)).subscribe(() => {
      this.router.navigate(['/']);
    }, error => {
      this.error = error.name === 'HttpErrorResponse' ? 'Server Error' : error.message;
      // сделать удалённую страницу недоступной
    });
  }

  ngOnDestroy(): void {
    this.notifier.next();
    this.notifier.complete();
  }
}
