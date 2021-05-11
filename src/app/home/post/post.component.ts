import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Post} from '../../shared/interfaces';
import {PostService} from '../../shared/services/post.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit, OnDestroy {

  @Input() post: Post;
  @Output() onDelete: EventEmitter<string> = new EventEmitter<string>();
  deletSubs: Subscription;

  constructor(private postService: PostService) {
  }

  ngOnInit(): void {
  }

  delete(id: string): void {
    this.deletSubs = this.postService.deletePost(id).subscribe(() => {
      this.onDelete.emit(id);
    }, error => console.log(error.message));
  }

  ngOnDestroy(): void {
    if (this.deletSubs) {
      this.deletSubs.unsubscribe();
    }
  }
}
