import { createAction, props } from "@ngrx/store";
import { Post } from "src/app/models/posts.model";



export const ADD_POST_ACTION = '[posts page] add post';
export const UPDATE_POST_ACTION = '[posts page] update post';
export const DELETE_POST_ACTION = '[posts page] delete post';
export const LOAD_POSTS = '[posts page] load post';
export const LOAD_POSTS_SUCCESS = '[posts page] load posts success';
export const ADD_POSTS_SUCCESS = '[posts page] add posts success';
export const UPDATE_POSTS_SUCCESS = '[posts page] update posts success';
export const DELETE_POSTS_SUCCESS = '[posts page] delete posts success';

export const addPost = createAction(ADD_POST_ACTION, props<{ post: Post }>());
export const updatePost = createAction(UPDATE_POST_ACTION, props<{ post: Post }>());
export const deletePost = createAction(DELETE_POST_ACTION, props<{ id: string }>());
export const loadPosts = createAction(LOAD_POSTS);
export const loadPostsSuccess = createAction(LOAD_POSTS_SUCCESS, props<{ posts: Post[] }>());
export const addPostsSuccess = createAction(ADD_POSTS_SUCCESS, props<{ post: Post }>());
export const updatePostsSuccess = createAction(UPDATE_POSTS_SUCCESS, props<{ posts: Post[] }>());
export const deletePostsSuccess = createAction(DELETE_POSTS_SUCCESS, props<{ id: string }>());