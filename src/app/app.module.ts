import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { LoginComponent } from './components/login/login/login.component';
import { RegisterComponent } from './components/register/register/register.component';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { httpInterceptorProviders } from './components/_helpers/http.interceptor';
import { HomeComponent } from './components/home/home/home.component';
import { ProfileComponent } from './components/profile/profile/profile.component';
import { RecaptchaV3Module, RECAPTCHA_V3_SITE_KEY } from 'ng-recaptcha';
import { environment } from 'src/environments/environment';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ProfileComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RecaptchaV3Module

  ],
  providers: [httpInterceptorProviders, {
    provide: RECAPTCHA_V3_SITE_KEY,
        useValue: environment.recaptcha.siteKey,
    }, ],
  bootstrap: [AppComponent]
})
export class AppModule { }
