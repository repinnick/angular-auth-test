import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {TECHNOLOGIES} from '../../shared/constants';
import {ActivatedRoute, Params} from '@angular/router';
import {PostService} from '../../shared/services/post.service';
import {Post} from '../../shared/interfaces';
import {switchMap} from 'rxjs/operators';
import {logger} from 'codelyzer/util/logger';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.scss']
})
export class EditPostComponent implements OnInit {

  form: FormGroup;
  technologies: Array<string>;
  post: Post;
  id: string;

  constructor(private route: ActivatedRoute,
              private postService: PostService) {
  }

  ngOnInit(): void {
    this.technologies = TECHNOLOGIES;
    this.route.params.pipe(
      switchMap((params: Params) => {
        return this.postService.getPostById(params.id);
      })).subscribe((post: Post) => {
      this.form = new FormGroup({
        title: new FormControl(post.title, Validators.required),
        text: new FormControl(post.text, Validators.required),
      });
    });
  }


    submit(): void {}

  }

