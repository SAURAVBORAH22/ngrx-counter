import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AppState } from "../store/app.state";
import { Store } from "@ngrx/store";
import { isAuthenticated } from "../auth/state/auth.selector";
import { map } from "rxjs/operators";

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private store: Store<AppState>,
        private router: Router
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return this.store.select(isAuthenticated).pipe(
            map((authenticate) => {
                if (!authenticate) {
                    return this.router.createUrlTree(['auth']);
                }
                return true;
            })
        )
    }
}