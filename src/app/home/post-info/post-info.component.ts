import {Component, OnDestroy, OnInit} from '@angular/core';
import {switchMap, takeUntil} from 'rxjs/operators';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Comments, Post} from '../../shared/interfaces';
import {PostService} from '../../shared/services/post.service';
import {Subject} from 'rxjs';
import {logger} from 'codelyzer/util/logger';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../shared/services/auth.service';

@Component({
  selector: 'app-post-info',
  templateUrl: './post-info.component.html',
  styleUrls: ['./post-info.component.scss']
})
export class PostInfoComponent implements OnInit, OnDestroy {

  post: Post;
  error: string;
  notifier = new Subject();
  form: FormGroup;
  submitted: boolean;
  comment: Comments;

  constructor(private route: ActivatedRoute,
              private postService: PostService,
              private router: Router,
              private authService: AuthService) {
  }

  ngOnInit(): void {
    this.loadPost();
    this.form = new FormGroup({
      text: new FormControl('', Validators.required)
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

  loadPost(): void {
    this.route.params.pipe(
      switchMap((params: Params) => {
        return this.postService.getPostById(params.id);
      })).subscribe((post: Post) => {
      this.post = post;
    }, error => {
      this.error = error.name === 'HttpErrorResponse' ? 'Server Error' : error.message;
    });
  }
  ngOnDestroy(): void {
    this.notifier.next();
    this.notifier.complete();
  }

  submit(): void {
    this.submitted = true;
    this.comment = {
      id: this.postService.generateId(),
      decision: false,
      text: this.form.value.text,
      author: this.authService.user.email,
      date: +new Date(),
    };
    if (!this.post.comments) {
      this.post.comments = [this.comment];
    } else {
      this.post.comments.push(this.comment);
    }
    this.postService.update({
      ...this.post
    }).pipe(takeUntil(this.notifier)).subscribe(() => {
      this.submitted = false;
      console.log(this.post);
      this.form.reset();
    }, error => {
      this.submitted = false;
      this.error = error.name === 'HttpErrorResponse' ? 'Server Error' : error.message;
    });
  }
}
