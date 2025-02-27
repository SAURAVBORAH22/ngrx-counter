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
        return this.firestore.collection('Posts').valueChanges()
            .pipe(
                map((data: any[]) => {
                    return data.map(item => ({
                        id: item.id,
                        title: item.title,
                        description: item.description
                    })) as Post[];
                })
            );
    }

    addPosts(post: Post): Observable<Post[]> {
        return from(this.firestore.collection('Posts').add(post)).pipe(
            switchMap(() => this.getPosts())
        );
    }
}