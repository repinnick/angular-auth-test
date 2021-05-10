import {Component, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {Post} from '../shared/interfaces';
import {PostService} from '../shared/services/post.service';
import {AuthService} from '../shared/services/auth.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {

  form: FormGroup;
  onLoad: boolean;

  constructor(private postService: PostService,
              private authService: AuthService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl('', Validators.required),
      text: new FormControl('', Validators.required),
      tags: new FormArray([], Validators.required),
    });
    this.onLoad = false;
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
      date: new Date(),
      tags: this.form.value.tags,
      author: this.authService.user.email,
      onModeration: true
    };
    this.postService.createPost(post).subscribe(
      response => {
        this.onLoad = true;
        this.form.reset();
        this.router.navigate(['/']);
      },
      error => console.log(error.message));
  }
}
