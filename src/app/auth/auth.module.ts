import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { EffectsModule } from "@ngrx/effects";
import { AuthEffects } from "./state/auth.effects";
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: '', redirectTo: 'login'
            },
            {
                path: 'login', component: LoginComponent
            },
            {
                path: 'signup', component: SignupComponent
            }
        ]
    }
]

@NgModule({
    imports: [CommonModule,
        ReactiveFormsModule,
        EffectsModule.forFeature(),
        RouterModule.forChild(routes)
    ],
    declarations: [LoginComponent, SignupComponent]
})
export class AuthModule {

}