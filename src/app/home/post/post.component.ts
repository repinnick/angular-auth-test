import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Post} from '../../shared/interfaces';
import {PostService} from '../../shared/services/post.service';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {ColorChangeService} from '../../shared/services/colorChange.servise';
import {AuthService} from '../../shared/services/auth.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit, OnDestroy {

  @Input() post: Post;
  @Input() display: string;
  @Output() onDelete: EventEmitter<string> = new EventEmitter<string>();
  @Output() onApprove: EventEmitter<string> = new EventEmitter<string>();
  notifier = new Subject();
  error: string;
  color: object;

  constructor(private postService: PostService,
              private colorChangeService: ColorChangeService,
              public authService: AuthService) {
  }

  ngOnInit(): void {
    this.colorChangeService.updateColor().pipe(takeUntil(this.notifier)).subscribe(color => this.color = color);
    if (localStorage.length) {
      this.color = {background: localStorage.getItem('colorTheme')};
    }
  }

  delete(id: string): void {
    this.postService.deletePost(id)
      .pipe(takeUntil(this.notifier))
      .subscribe(() => this.onDelete.emit(id),
        error => this.error = error.message);
  }

  ngOnDestroy(): void {
    this.notifier.next();
    this.notifier.complete();
    this.color = null;
  }

  approvePost(post: Post): void{
    this.postService.update({
      ...this.post,
      isModeration: false,
    })
      .pipe(takeUntil(this.notifier))
      .subscribe(() => this.onApprove.emit(), error => {
      this.error = error.name === 'HttpErrorResponse' ? 'Server Error' : error.message;
    });
  }
}
