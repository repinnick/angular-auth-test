import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../shared/services/auth.service';
import {Post, User} from '../shared/interfaces';
import {Router} from '@angular/router';
import {PostService} from '../shared/services/post.service';
import {Subject, Subscriber, Subscription} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {TECHNOLOGIES} from '../shared/constants';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  posts: Post[];
  notifier = new Subject();
  error: string;
  isSortArgs: boolean;
  isVisibleSort: boolean;
  isVisibleFilters: boolean;
  tags: Array<string>;
  tagValue: string;
  periodValue: number;
  decision: string;
  displayQuestion: string;

  constructor(private authService: AuthService, private postService: PostService) {
  }

  ngOnInit(): void {
    this.getPosts();
    this.isSortArgs = false;
    this.isVisibleSort = false;
    this.isVisibleFilters = false;
    this.tags = TECHNOLOGIES;
    this.displayQuestion = 'block';
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
