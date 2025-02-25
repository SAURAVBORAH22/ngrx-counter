import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AngularFireAuth } from '@angular/fire/auth';
import { from, Observable } from "rxjs";
import { AuthResponseData } from "../models/AuthResponseData.model";
import { map } from "rxjs/operators";
import { User } from "../models/userModel";
import { AppState } from "../store/app.state";
import { Store } from "@ngrx/store";
import { autoLogout } from "../auth/state/auth.actions";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    timeoutInterval: any;
    constructor(
        private afAuth: AngularFireAuth,
        private store: Store<AppState>
    ) { }

    login(email: string, password: string): Observable<AuthResponseData> {
        return from(this.afAuth.signInWithEmailAndPassword(email, password)).pipe(
            map((userCredential: any) => {
                const user = userCredential.user;
                return {
                    idToken: user?.idToken || '',
                    email: user?.email || '',
                    refreshToken: user?.refreshToken,
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
                    idToken: user?.idToken || '',
                    email: user?.email || '',
                    refreshToken: user?.refreshToken,
                    expiresIn: userCredential.expirationDate || '3600',
                    localId: user?.uid || '',
                    registered: userCredential.additionalUserInfo?.isNewUser || false,
                };
            })
        );
    }

    formatUser(data: AuthResponseData) {
        const expirationDate = new Date(new Date().getTime() + +data.expiresIn * 1000)
        const user = new User(data.email, data.refreshToken, data.localId, expirationDate);
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

    runTimeoutInterval(user: User) {
        const todaysDate = new Date().getTime();
        const expirationDate = user.expireDate.getTime();
        const timeInterval = expirationDate - todaysDate;
        this.timeoutInterval = setTimeout(() => {
            this.store.dispatch(autoLogout())
        }, timeInterval)
    }

    setUserInLocalStorage(user: User) {
        localStorage.setItem('userData', JSON.stringify(user));
        this.runTimeoutInterval(user);
    }

    getUserFromLocalStore() {
        const userDataString = localStorage.getItem('userData');
        if (userDataString) {
            const userData = JSON.parse(userDataString);
            const expirationDate = new Date(userData.expirationDate);
            const user = new User(userData.email, userData.refreshToken, userData.localId, expirationDate);
            this.runTimeoutInterval(user);
            return user;
        }
        return null
    }

    logout() {
        localStorage.removeItem('userData');
        if (this.timeoutInterval) {
            clearTimeout(this.timeoutInterval);
            this.timeoutInterval = null;
        }
    }


}