import {Component, Input, OnInit} from '@angular/core';
import {Post} from "../../shared/interfaces";
import {PostService} from "../../shared/services/post.service";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  @Input() post: Post

  constructor(private postService: PostService) { }

  ngOnInit(): void {
  }

  delete(id: string) {
    this.postService.deletePost(id).subscribe(() => {
      console.log('deleted')
    }, error => console.log(error.message))
  }
}
