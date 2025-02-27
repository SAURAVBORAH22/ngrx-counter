import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { Post } from 'src/app/models/posts.model';
import { AppState } from 'src/app/store/app.state';
import { getPostById } from '../state/posts.selector';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.css']
})
export class SinglePostComponent implements OnInit, OnDestroy {
  post: Post = {
    'title': '',
    'description': ''
  };
  postSubscription: Subscription = new Subscription;
  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.store.select(getPostById).subscribe((post) => {
      if (post) {
        this.post = post;
      }
    });
  }

  ngOnDestroy(): void {
    if (this.postSubscription) {
      this.postSubscription.unsubscribe();
    }
  }

}
