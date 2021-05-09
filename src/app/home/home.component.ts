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
  postSubscription: Subscription
  validPost: boolean;

  constructor(private authService: AuthService, private postService: PostService) {
  }

  ngOnInit(): void {
    this.postSubscription = this.postService.getAllPosts().subscribe(res => {
      this.posts = res
      this.posts.map((post) => {
        if (!post.onModeration) {
          this.validPost = true;
          return
        }
      })
    }, error => {console.log(error.message)})
  }

  ngOnDestroy() {
    if (this.postSubscription) {
      this.postSubscription.unsubscribe()
    }
  }
}
