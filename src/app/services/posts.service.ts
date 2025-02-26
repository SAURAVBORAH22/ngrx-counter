import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { Observable } from "rxjs";
import { Post } from "../models/posts.model";
import { map } from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class PostsService {
    constructor(private http: HttpClient, private firestore: AngularFirestore) { }

    getPosts(): Observable<Post[]> {
        return (this.firestore.collection('Posts').valueChanges())
            .pipe(
                map((data) => {
                    const posts: Post[] = [];
                    data.forEach((item: any, index: number) => {
                        posts.push({
                            'id': (index + 1).toString(),
                            'title': item.title,
                            'description': item.description
                        })
                    })
                    return posts;
                })
            );
    }
}