import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { AppRoutingModule } from './app-routing.module';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { LoadingSpinnerComponent } from './shared/components/loading-spinner/loading-spinner.component';
import { appReducer } from './store/app.state';
import { AuthEffects } from './auth/state/auth.effects';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AuthTokenInterceptor } from './services/AuthToken.interceptor';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { CustomSerializer } from './store/router/custom-serializer';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    LoadingSpinnerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    StoreModule.forRoot(appReducer),
    EffectsModule.forRoot([AuthEffects]),
    StoreDevtoolsModule.instrument({
      logOnly: environment.production //restricts extension to log-only mode
    }),
    AngularFireModule.initializeApp(environment.firebaseConfig), // Initialize Firebase with the config
    AngularFireAuthModule, // If you're using Firebase Authentication
    AngularFirestoreModule,
    StoreRouterConnectingModule.forRoot({
      serializer: CustomSerializer
    })
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthTokenInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
