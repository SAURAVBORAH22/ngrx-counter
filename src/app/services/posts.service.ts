import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { from, Observable } from "rxjs";
import { Post } from "../models/posts.model";
import { map, switchMap } from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class PostsService {
    constructor(private http: HttpClient, private firestore: AngularFirestore) { }

    getPosts(): Observable<Post[]> {
        return this.firestore.collection('Posts').snapshotChanges()
            .pipe(
                map((actions: any[]) => {
                    return actions.map(action => {
                        const data = action.payload.doc.data();
                        const id = action.payload.doc.id;
                        return {
                            id,
                            title: data.title,
                            description: data.description,
                        } as Post;
                    });
                })
            );
    }

    addPosts(post: Post): Observable<Post[]> {
        return from(this.firestore.collection('Posts').add(post)).pipe(
            switchMap(() => this.getPosts())
        );
    }

    updatePosts(post: Post): Observable<Post[]> {
        return this.firestore.collection('Posts', ref => ref.where('id', '==', post.id))
            .get()
            .pipe(
                switchMap(snapshot => {
                    return from(this.firestore.collection('Posts').doc(post.id).update(post)).pipe(
                        switchMap(() => this.getPosts())
                    );
                })
            );
    }

    deletePost(id: string): Observable<Post[]> {
        return this.firestore.collection('Posts', ref => ref.where('id', '==', id))
            .get()
            .pipe(
                switchMap(snapshot => {
                    return from(this.firestore.collection('Posts').doc(id).delete()).pipe(
                        switchMap(() => this.getPosts())
                    );
                })
            );
    }

    getPostById(id: string): Observable<Post> {
        return this.firestore.collection('Posts').doc(id).get().pipe(
            map(doc => {
                if (doc.exists) {
                    return doc.data() as Post;
                } else {
                    throw new Error('Post not found');
                }
            })
        )
    }
}