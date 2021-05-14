import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {PostService} from '../../shared/services/post.service';
import {AuthService} from '../../shared/services/auth.service';
import {Router} from '@angular/router';
import {Post} from '../../shared/interfaces';
import {TECHNOLOGIES} from '../../shared/constants';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';


@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit, OnDestroy {

  form: FormGroup;
  isLoad: boolean;
  notifier = new Subject();
  technologies: Array<string>;
  error: string;

  constructor(private postService: PostService,
              private authService: AuthService,
              private router: Router){
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl('', Validators.required),
      text: new FormControl('', Validators.required),
      tags: new FormArray([], [Validators.required, Validators.min(1)]),
    });
    this.technologies = TECHNOLOGIES;
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

  submit(): void {
    if (this.form.invalid) {
      return;
    }
    const post: Post = {
      title: this.form.value.title,
      text: this.form.value.text,
      date: +new Date(),
      tags: this.form.value.tags,
      author: this.authService.user.email,
      onModeration: true
    };
    this.isLoad = true;
    this.postService.createPost(post).pipe(takeUntil(this.notifier)).subscribe(
      response => {
        this.form.reset();
        this.router.navigate(['/']);
        this.isLoad = false;
      },
      error => {
        this.isLoad = false;
        this.error = error.name === 'HttpErrorResponse' ? 'Server Error' : error.message;
      });
  }

  ngOnDestroy(): void {
    this.notifier.next();
    this.notifier.complete();
  }
}
