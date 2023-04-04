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
import { FooterComponent } from './components/footer/footer.component';
import { ContattiComponent } from './components/contatti/contatti.component';
import { CardDetailsComponent } from './components/card-details/card-details.component';
import { AddCardComponent} from './components/add-card/add-card.component';
import { AllCardsComponent } from './components/all-cards/all-cards.component';
import { ModificaCardComponent } from './components/modifica-card/modifica-card.component';







@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    NavbarComponent,
    HomeComponent,
    TourComponent,
    FooterComponent,
    ContattiComponent,
    CardDetailsComponent,
    AddCardComponent,
    AllCardsComponent,
    ModificaCardComponent


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
