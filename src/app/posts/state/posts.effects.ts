import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { PostsService } from "src/app/services/posts.service";
import { addPost, addPostsSuccess, loadPosts, loadPostsSuccess } from "./posts.actions";
import { map, mergeMap } from "rxjs/operators";

@Injectable()
export class PostsEffects {
    constructor(private actions$: Actions, private postService: PostsService) { }

    loadPosts$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(loadPosts),
            mergeMap((action) => {
                return this.postService.getPosts().pipe(map((posts) => {
                    return loadPostsSuccess({ posts });
                }))
            })
        );
    });

    addPost$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(addPost), mergeMap((action) => {
                return this.postService.addPosts(action.post).pipe(map((data) => {
                }))
            }))
    }, { dispatch: false });
}