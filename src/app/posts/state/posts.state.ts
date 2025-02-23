import { Post } from "src/app/models/posts.model"

export interface PostsState {
    posts: Post[]
}

export const initialState: PostsState = {
    posts: [
        { 'id': '1', 'title': 'Sample title 1', 'description': 'Sample description 1' },
        { 'id': '2', 'title': 'Sample title 2', 'description': 'Sample description 2' }
    ]
}