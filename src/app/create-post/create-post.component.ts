import { Component, OnInit } from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";


@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {

  form: FormGroup

  constructor() {}

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl("", Validators.required),
      text: new FormControl("", Validators.required),
      tags: new FormArray([], Validators.required)
    })
  }

  submit() {
    console.log(this.form.value)
  }
}
