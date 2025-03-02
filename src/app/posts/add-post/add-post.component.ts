import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Post } from 'src/app/models/posts.model';
import { AppState } from 'src/app/store/app.state';
import { addPost } from '../state/posts.actions';
import { getPosts } from '../state/posts.selector';
import { take } from 'rxjs/operators';
@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {
  postForm: FormGroup = new FormGroup({});
  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.postForm = new FormGroup({
      title: new FormControl(null, [Validators.required, Validators.minLength(6)]),
      description: new FormControl(null, [Validators.required, Validators.minLength(10)])
    })
  }

  showDescriptionErrors() {
    const descriptionForm = this.postForm.get('description');
    if (descriptionForm?.touched && !descriptionForm?.valid) {
      if (descriptionForm?.errors?.required) {
        return 'Description is required';
      }
      if (descriptionForm?.errors?.minLength) {
        return 'Description should be of minimum of 10 characters'
      }
    }
    return '';
  }

  onAddPost() {
    if (!this.postForm.valid) {
      return;
    }
    this.store.select(getPosts).pipe(take(1)).subscribe(posts => {
      const post: Post = {
        id: (posts.length + 1).toString(),
        title: this.postForm.value.title,
        description: this.postForm.value.description
      };
      this.store.dispatch(addPost({ post }));
    });
  }

}
