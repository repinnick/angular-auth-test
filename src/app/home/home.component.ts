import {Component, OnInit} from '@angular/core';
import {AuthService} from '../shared/services/auth.service';
import {Post, User} from '../shared/interfaces';
import {Router} from '@angular/router';
import {PostService} from '../shared/services/post.service';
import {Subscriber, Subscription} from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  email = '';
  user: User;
  posts: Post[];
  validPost: boolean;

  constructor(private authService: AuthService, private postService: PostService) {
  }

  ngOnInit(): void {
    this.getPosts();
  }


  updatePosts($event: string): void{
    this.getPosts();
  }

  getPosts(): void {
    this.postService.getAllPosts().subscribe(res => {
      this.posts = res;
      this.posts.map((post) => {
        if (!post.onModeration) {
          this.validPost = true;
          return post;
        }
      });
    }, error => {
      console.log(error.message);
    });
  }
}
