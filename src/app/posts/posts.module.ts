import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PostListComponent } from "./post-list/post-list.component";
import { AddPostComponent } from "./add-post/add-post.component";
import { EditPostComponent } from "./edit-post/edit-post.component";
import { ReactiveFormsModule } from "@angular/forms";
import { StoreModule } from "@ngrx/store";
import { postsReducer } from "./state/posts.reducer";
import { POST_STATE_NAME } from "./state/posts.selector";
import { EffectsModule } from "@ngrx/effects";
import { PostsEffects } from "./state/posts.effects";

const routes: Routes = [
    {
        path: '', component: PostListComponent,
        children: [
            {
                path: 'add', component: AddPostComponent
            },
            {
                path: 'edit/:id', component: EditPostComponent
            }
        ]
    }
];

@NgModule({
    declarations: [
        PostListComponent,
        AddPostComponent,
        EditPostComponent
    ],
    imports: [CommonModule,
        ReactiveFormsModule,
        RouterModule.forChild(routes),
        StoreModule.forFeature(POST_STATE_NAME, postsReducer),
        EffectsModule.forFeature([PostsEffects])
    ]
})
export class PostsModule {

}