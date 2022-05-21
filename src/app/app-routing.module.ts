import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgendaFormComponent } from './pages/agenda/agenda-form/agenda-form.component';

import { HomeComponent } from './pages/home/home.component';
import { VotingComponent } from './pages/session/votin/voting/voting.component';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full' },
  {path: 'home', component: HomeComponent },
  {path: 'agenda-form', component: AgendaFormComponent},
  {path: 'voting', component: VotingComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
