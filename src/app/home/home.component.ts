import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from "../shared/services/auth.service";
import {Post, User} from "../shared/interfaces";
import {Router} from "@angular/router";
import {PostService} from "../shared/services/post.service";
import {Subscriber, Subscription} from "rxjs";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  email: string = ""
  user: User
  posts: Post[]
  subscription: Subscription

  constructor(private authService: AuthService, private postService: PostService) {
  }

  ngOnInit(): void {
    // this.email = this.authService.user.email
    this.subscription = this.postService.getAllPosts().subscribe(res => {
      this.posts = res
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }
}
