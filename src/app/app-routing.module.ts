import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardDetailsComponent } from './components/card-details/card-details.component';
import { ContattiComponent } from './components/contatti/contatti.component';
import { HomeComponent } from './components/home/home/home.component';
import { LoginComponent } from './components/login/login/login.component';
import { RegisterComponent } from './components/register/register/register.component';
import { TourComponent } from './components/tour/tour.component';
import { AuthguardGuard } from './guard/authguard.guard';
import { AddCardComponent } from './components/add-card/add-card.component';
import { AllCardsComponent } from './components/all-cards/all-cards.component';
import { AdminGuard } from './guard/admin.guard';
import { ModificaCardComponent } from './components/modifica-card/modifica-card.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent },
  {path: 'register', component: RegisterComponent},
  {path: 'contatti', component: ContattiComponent},
  {path: 'tour', component: TourComponent,canActivate:[AuthguardGuard] },
  {path: 'detail/:id',component: CardDetailsComponent},
  {path: 'add_card',component: AddCardComponent ,canActivate:[AuthguardGuard,AdminGuard]},
  {path: 'all_cards',component: AllCardsComponent,canActivate:[AuthguardGuard, AdminGuard]},
 {path: 'modify_card/:id',component: ModificaCardComponent,canActivate:[AuthguardGuard, AdminGuard]}
];



@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: "enabled" })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
