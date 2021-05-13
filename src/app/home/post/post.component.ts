import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Post} from '../../shared/interfaces';
import {PostService} from '../../shared/services/post.service';
import {Subject, Subscription} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit, OnDestroy {

  @Input() post: Post;
  @Output() onDelete: EventEmitter<string> = new EventEmitter<string>();
  deletSubs: Subscription;
  notifier = new Subject();

  constructor(private postService: PostService) {
  }

  ngOnInit(): void {
  }

  delete(id: string): void {
    this.deletSubs = this.postService.deletePost(id).pipe(takeUntil(this.notifier)).subscribe(() => {
      this.onDelete.emit(id);
    }, error => console.log(error.message));
  }

  ngOnDestroy() {
    this.notifier.next();
    this.notifier.complete();
  }
}
