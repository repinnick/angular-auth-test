import {Component, OnInit} from '@angular/core';
import {switchMap} from 'rxjs/operators';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Post} from '../../shared/interfaces';
import {PostService} from '../../shared/services/post.service';

@Component({
  selector: 'app-post-info',
  templateUrl: './post-info.component.html',
  styleUrls: ['./post-info.component.scss']
})
export class PostInfoComponent implements OnInit {

  post: Post;
  error: string;

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
    this.postService.deletePost(this.post.id).subscribe(() => {
      console.log('deleted');
      this.router.navigate(['/']);
    }, error => {
      this.error = error.message;
      console.log(error.message);
      // обработать ошибки в html
      // сделать удалённую страницу недоступной
    });
  }
}
