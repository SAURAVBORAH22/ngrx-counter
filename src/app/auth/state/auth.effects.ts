import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { autoLogin, autoLogout, loginStart, loginSuccess, signUpStart, signUpSuccess } from "./auth.actions";
import { catchError, exhaustMap, map, mergeMap } from 'rxjs/operators';
import { AuthService } from "src/app/services/auth.service";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/store/app.state";
import { setErrorMessage, setLoadingSpinner } from "src/app/store/shared/shared.actions";
import { of } from "rxjs";
import { Router } from "@angular/router";

@Injectable()
export class AuthEffects {
    constructor(
        private actions$: Actions,
        private authService: AuthService,
        private store: Store<AppState>,
        private router: Router
    ) { }

    login$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(loginStart),
            exhaustMap((action) => {
                return this.authService.login(action.email, action.password).pipe(
                    map((data) => {
                        this.store.dispatch(setLoadingSpinner({ status: false }));
                        this.store.dispatch(setErrorMessage({ message: '' }));
                        const user = this.authService.formatUser(data);
                        this.authService.setUserInLocalStorage(user);
                        return loginSuccess({ user: user, redirect: true });
                    }),
                    catchError((errResp) => {
                        this.store.dispatch(setLoadingSpinner({ status: false }));
                        const parsedMessage = JSON.parse(errResp.message);
                        const errorMessage = this.authService.getErrorMessage(parsedMessage.error.message);
                        return of(setErrorMessage({ message: errorMessage }));
                    })
                );
            })
        );
    });

    loginRedirect$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(...[loginSuccess, signUpSuccess]),
            map((action) => {
                this.store.dispatch(setErrorMessage({ message: '' }));
                if (action.redirect) {
                    this.router.navigate(['/'])
                }
            })
        );
    }, { dispatch: false })

    signUp$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(signUpStart),
            exhaustMap((action) => {
                return this.authService.signUp(action.email, action.password).pipe(
                    map((data) => {
                        this.store.dispatch(setLoadingSpinner({ status: false }));
                        this.store.dispatch(setErrorMessage({ message: '' }));
                        const user = this.authService.formatUser(data);
                        this.authService.setUserInLocalStorage(user);
                        return signUpSuccess({ user: user, redirect: true });
                    }),
                    catchError((errResp) => {
                        this.store.dispatch(setLoadingSpinner({ status: false }));
                        return of(setErrorMessage({ message: errResp.message }));
                    })
                );
            })
        );
    })

    autoLogin$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(autoLogin),
            mergeMap((action) => {
                const user = this.authService.getUserFromLocalStore()!;
                return of(loginSuccess({ user: user, redirect: false }));
            })
        );
    });

    logout$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(autoLogout),
            map((action) => {
                this.authService.logout();
                this.router.navigate(['auth']);
            })
        );
    }, { dispatch: false });
}