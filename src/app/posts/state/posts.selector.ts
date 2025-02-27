import { createFeatureSelector, createSelector } from "@ngrx/store";
import { PostsState } from "./posts.state";
import { getCurrentRoute } from "src/app/store/router/router.selector";
import { RouterStateUrl } from "src/app/store/router/custom-serializer";
import { Post } from "src/app/models/posts.model";

export const POST_STATE_NAME = 'posts';
const getPostsState = createFeatureSelector<PostsState>(POST_STATE_NAME);

export const getPosts = createSelector(getPostsState, (state) => {
    return state.posts;
});

export const getPostById = createSelector(
    getPosts,
    getCurrentRoute,
    (posts, route: RouterStateUrl) => {
        return posts.find((post: Post) => post.id === route.params['id']);
    }
);