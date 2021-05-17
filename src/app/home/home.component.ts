import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../shared/services/auth.service';
import {Post, User} from '../shared/interfaces';
import {Router} from '@angular/router';
import {PostService} from '../shared/services/post.service';
import {Subject, Subscriber, Subscription} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {TECHNOLOGIES, PERIOD} from '../shared/constants';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  posts: Post[];
  notifier = new Subject();
  error: string;
  isSort: boolean;
  isVisibleSort: boolean;
  isVisibleFilters: boolean;
  tags: Array<string>;
  tagValue: string;
  periods: Array<string>;
  periodValue: string;

  constructor(private authService: AuthService, private postService: PostService) {
  }

  ngOnInit(): void {
    this.getPosts();
    this.isSort = false;
    this.isVisibleSort = false;
    this.isVisibleFilters = false;
    this.tags = TECHNOLOGIES;
    this.periods = PERIOD;
  }

  updatePosts($event: string): void {
    this.getPosts();
  }

  getPosts(): void {
    this.postService.getAllPosts()
      .pipe(takeUntil(this.notifier))
      .subscribe(posts => this.posts = posts, error => this.error = error.message);
  }
  // обработать ошибки в шаблоне

  ngOnDestroy(): void {
    this.notifier.next();
    this.notifier.complete();
  }
}
