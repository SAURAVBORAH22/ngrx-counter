import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AngularFireAuth } from '@angular/fire/auth';
import { from, Observable } from "rxjs";
import { AuthResponseData } from "../models/AuthResponseData.model";
import { map } from "rxjs/operators";
import { User } from "../models/userModel";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(private http: HttpClient, private afAuth: AngularFireAuth) { }

    login(email: string, password: string): Observable<AuthResponseData> {
        return from(this.afAuth.signInWithEmailAndPassword(email, password)).pipe(
            map((userCredential: any) => {
                const user = userCredential.user;
                return {
                    idToken: userCredential.idToken || '',
                    email: user?.email || '',
                    refreshToken: userCredential.refreshToken || '',
                    expiresIn: userCredential.expirationDate || '3600',
                    localId: user?.uid || '',
                    registered: userCredential.additionalUserInfo?.isNewUser || false,
                };
            })
        );
    }

    signUp(email: string, password: string): Observable<AuthResponseData> {
        return from(this.afAuth.createUserWithEmailAndPassword(email, password)).pipe(
            map((userCredential: any) => {
                const user = userCredential.user;
                return {
                    idToken: userCredential.idToken || '',
                    email: user?.email || '',
                    refreshToken: userCredential.refreshToken || '',
                    expiresIn: userCredential.expirationDate || '3600',
                    localId: user?.uid || '',
                    registered: userCredential.additionalUserInfo?.isNewUser || false,
                };
            })
        );
    }

    formatUser(data: AuthResponseData) {
        const expirationDate = new Date(new Date().getTime() + +data.expiresIn * 1000)
        const user = new User(data.email, data.idToken, data.localId, expirationDate);
        return user;
    }

    getErrorMessage(message: string) {
        switch (message) {
            case 'EMAIL_NOT_FOUND':
                return 'Email not found';
            case 'INVALID_PASSWORD':
                return 'Invalid password';
            case 'INVALID_LOGIN_CREDENTIALS':
                return 'Invalid login credentials'
            default:
                return 'Unknown error occured.Please try again.'
        }
    }


}