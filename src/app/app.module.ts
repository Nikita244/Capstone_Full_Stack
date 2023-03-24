import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { LoginComponent } from './components/login/login/login.component';
import { RegisterComponent } from './components/register/register/register.component';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { httpInterceptorProviders } from './components/_helpers/http.interceptor';
import { ProfileComponent } from './components/profile/profile/profile.component';
import { environment } from 'src/environments/environment';
import { RECAPTCHA_SETTINGS, RecaptchaFormsModule, RecaptchaModule, RecaptchaSettings } from 'ng-recaptcha';
import { NavbarComponent } from './components/navbar/navbar/navbar.component';
import { HomeComponent } from './components/home/home/home.component';
import { TourComponent } from './components/tour/tour.component';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    NavbarComponent,
    HomeComponent,
    TourComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RecaptchaModule,
    RecaptchaFormsModule


  ],
  providers: [httpInterceptorProviders, {
    provide: RECAPTCHA_SETTINGS,
    useValue: {
      siteKey: environment.recaptcha.siteKey,
    } as RecaptchaSettings,
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
