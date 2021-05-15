import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../shared/services/auth.service';
import {Post, User} from '../shared/interfaces';
import {Router} from '@angular/router';
import {PostService} from '../shared/services/post.service';
import {Subject, Subscriber, Subscription} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  email = '';
  user: User;
  posts: Post[];
  validPost: boolean;
  notifier = new Subject();
  error: string;

  constructor(private authService: AuthService, private postService: PostService) {
  }

  ngOnInit(): void {
    this.getPosts();
  }

  updatePosts($event: string): void {
    this.getPosts();
  }

  getPosts(): void {
    this.postService.getAllPosts()
      .pipe(takeUntil(this.notifier))
      .subscribe(res => {
        this.posts = res;
        this.posts.map((post) => {
          if (!post.onModeration) {
            this.validPost = true;
            return post;
          }
        });
      }, error => this.error = error.message);
  }
  // обработать ошибки в шаблоне

  ngOnDestroy(): void {
    this.notifier.next();
    this.notifier.complete();
  }
}
