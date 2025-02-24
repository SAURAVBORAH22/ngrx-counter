import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { EffectsModule } from "@ngrx/effects";
import { AuthEffects } from "./state/auth.effects";

const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: '', redirectTo: 'login'
            },
            {
                path: 'login', component: LoginComponent
            }
        ]
    }
]

@NgModule({
    imports: [CommonModule,
        ReactiveFormsModule,
        EffectsModule.forFeature([AuthEffects]),
        RouterModule.forChild(routes)
    ],
    declarations: [LoginComponent]
})
export class AuthModule {

}