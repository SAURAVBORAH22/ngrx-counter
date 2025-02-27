import { createReducer, on } from "@ngrx/store"
import { initialState } from "./posts.state"
import { addPostsSuccess, deletePost, loadPostsSuccess, updatePost } from "./posts.actions";

const _postsReducer = createReducer(
    initialState,
    on(addPostsSuccess, (state, action) => {
        let post = { ...action.post };
        return {
            ...state,
            posts: [...state.posts, post],
        }
    }),
    on(updatePost, (state, action) => {
        const updatedPosts = state.posts.map(post => {
            return action.post.id === post.id ? action.post : post;
        })
        return {
            ...state,
            posts: updatedPosts
        }
    }),
    on(deletePost, (state, { id }) => {
        const updatedPosts = state.posts.filter(post => {
            return post.id !== id;
        })
        return {
            ...state,
            posts: updatedPosts
        }
    }),
    on(loadPostsSuccess, (state, action) => {
        return {
            ...state,
            posts: action.posts
        }
    })
)

export function postsReducer(state: any, action: any) {
    return _postsReducer(state, action)
}