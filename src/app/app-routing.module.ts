import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { AuthGuard } from "./services/auth.guard";
import { SinglePostComponent } from "./posts/single-post/single-post.component";

const routes: Routes = [
    {
        path: '', component: HomeComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'counter',
        loadChildren: () => import('./counter/counter.module').then((m) => m.CounterModule),
        canActivate: [AuthGuard]
    },
    {
        path: 'posts',
        loadChildren: () => import('./posts/posts.module').then((m) => m.PostsModule),
        canActivate: [AuthGuard]
    },
    {
        path: 'posts/details/:id',
        component: SinglePostComponent
    },
    {
        path: 'auth',
        loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule)
    }
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }