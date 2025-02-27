import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { PostsService } from "src/app/services/posts.service";
import { addPost, deletePost, loadPosts, loadPostsSuccess, updatePost } from "./posts.actions";
import { filter, map, mergeMap, switchMap } from "rxjs/operators";
import { ROUTER_NAVIGATION, RouterNavigatedAction } from "@ngrx/router-store";

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

    updatePost$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(updatePost), switchMap((action) => {
                return this.postService.updatePosts(action.post).pipe(map((data) => {
                }))
            })
        )
    }, { dispatch: false });

    deletePost$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(deletePost), switchMap((action) => {
                return this.postService.deletePost(action.id).pipe(map((data) => {
                }))
            })
        )
    }, { dispatch: false });

    getSinglePost$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(ROUTER_NAVIGATION),
            filter((r: RouterNavigatedAction) => {
                return r.payload.routerState.url.startsWith('/posts/details');
            }),
            map((r: RouterNavigatedAction) => {
                const url = r.payload.routerState.url;
                const match = url.match(/\/posts\/details\/([^/]+)/);
                if (match && match[1]) {
                    return match[1];
                } else {
                    return null;
                }
            }),
            switchMap(id => {
                if (id) {
                    return this.postService.getPostById(id).pipe(
                        map(post => {
                            const postData = [{ ...post, id }];
                            return loadPostsSuccess({ posts: postData });
                        })
                    );
                } else {
                    return [];
                }
            })
        );
    });


}