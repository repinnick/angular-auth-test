import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../shared/services/auth.service';
import {Color, Post} from '../shared/interfaces';
import {PostService} from '../shared/services/post.service';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {TECHNOLOGIES} from '../shared/constants';
import {FormArray, FormControl, FormGroup} from '@angular/forms';
import {ColorChangeService} from '../shared/services/colorChange.servise';


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
  displayQuestion: string;
  form: FormGroup;
  color: Color;
  isMyQuestion: boolean;
  isModeration: boolean;

  constructor(public authService: AuthService,
              private postService: PostService,
              private colorChangeService: ColorChangeService) {
  }

  ngOnInit(): void {
    this.getPosts();
    this.isSortArgs = false;
    this.isVisibleSort = false;
    this.isVisibleFilters = false;
    this.tags = TECHNOLOGIES;
    this.displayQuestion = 'block';
    this.isMyQuestion = false;
    this.isModeration = false;
    this.form = new FormGroup({
      tags: new FormArray([]),
      period: new FormControl(0),
      status: new FormControl(''),
    });
    this.colorChangeService.updateColor().pipe(takeUntil(this.notifier)).subscribe(color => this.color = (color as Color));
    if (localStorage.length) {
      this.color = {background: localStorage.getItem('colorTheme')};
    }
  }

  addTagToForm($event): void {
    const control = new FormControl(`${$event.target.value}`);
    const formArray = (this.form.get('tags') as FormArray);
    if ($event.target.checked) {
      formArray.push(control);
    } else {
      formArray.controls.forEach((control, index) => {
        if (control.value === $event.target.value) {
          formArray.removeAt(index);
        }
      });
    }
  }
  checkedButton(tag: string): boolean {
    return !!this.form.get('tags').value.find(option => option === tag);
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

  getColor($event): void {
    localStorage.setItem('colorTheme', $event.target.value);
    this.colorChangeService.setColor($event.target.value);
  }

  ngOnDestroy(): void {
    this.notifier.next();
    this.notifier.complete();
    this.color = null;
  }
}
