import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {TECHNOLOGIES} from '../../shared/constants';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {PostService} from '../../shared/services/post.service';
import {Post} from '../../shared/interfaces';
import {switchMap, takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.scss']
})
export class EditPostComponent implements OnInit, OnDestroy {

  form: FormGroup;
  technologies: Array<string>;
  post: Post;
  id: string;
  submitted = false;
  error: string;
  notifier = new Subject();

  constructor(private route: ActivatedRoute,
              private postService: PostService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.technologies = TECHNOLOGIES;
    this.route.params.pipe(
      switchMap((params: Params) => {
        return this.postService.getPostById(params.id);
      })).subscribe((post: Post) => {
      this.post = post;
      this.form = new FormGroup({
        title: new FormControl(post.title, Validators.required),
        text: new FormControl(post.text, Validators.required),
        tags: new FormArray(post.tags.map(tag => new FormControl(tag)), Validators.required)
      });
    });
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

  checked(technology: string): boolean {
    return !!this.post.tags.find(tag => tag === technology);
  }

  submit(): void {
    if (this.form.invalid) {
      return;
    }
    this.submitted = true;
    this.postService.update({
      ...this.post,
      text: this.form.value.text,
      title: this.form.value.title,
      tags: this.form.value.tags,
    }).pipe(takeUntil(this.notifier)).subscribe(() => {
      this.submitted = false;
      this.router.navigate(['/post-info', this.post.id]);
    }, error => {
      this.submitted = false;
      this.error = error.name === 'HttpErrorResponse' ? 'Server Error' : error.message;
    });
  }

  ngOnDestroy(): void {
    this.notifier.next();
    this.notifier.complete();
  }
}

