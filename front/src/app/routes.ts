import { Routes} from '@angular/router';
import { UserComponent} from './user/user.component';
import { SignUpComponent} from './user/sign-up/sign-up.component';
import { SignInComponent} from './user/sign-in/sign-in.component';
import {AuthGuard} from './auth/auth.guard';
import { EditComponent } from './expert/edit/edit.component';
import { ConsultationComponent } from './expert/consultation/consultation.component';
import { HistoryComponent } from './expert/history/history.component';
import { ExpertComponent } from './expert/expert.component';
import { ClientComponent } from './client/client.component';
import { ReservationComponent } from './client/reservation/reservation.component';
import { History2Component } from './client/history2/history2.component';
import { SearchComponent } from './client/search/search.component';
import { SelectedExpertComponent } from './client/selected-expert/selected-expert.component';
import { ReservaComponent } from './client/reserva/reserva.component';
import { EditExpertComponent } from './expert/edit-expert/edit-expert.component';
import { SelectComponent } from './client/select/select.component';
import { ParametreComponent } from './client/parametre/parametre.component';
import { ParametreExpertComponent } from './expert/parametre-expert/parametre-expert.component';
import { HomeComponent } from './expert/home/home.component';
import { HomeClientComponent } from './client/home-client/home-client.component';

export const appRoutes: Routes = [
    {
        path: 'signup',component: UserComponent,
        children: [{ path: '',component: SignUpComponent}]
    },
    {
        path: 'login',component: UserComponent,
        children: [{ path: '',component: SignInComponent}]
    },
    {
        path: 'expertprofile',component: ExpertComponent
    },
    {
        path: 'clientprofile',component: ClientComponent
    },
    {
        path: 'reservation',component: ClientComponent,
        children: [{ path: '',component: ReservationComponent}]
    },
    {
        path: 'history2',component: ClientComponent,
        children: [{ path: '',component: History2Component}]
    },
    {
        path: 'search',component: ClientComponent,
        children: [{ path: '',component: SearchComponent}]
    },
    {
        path: 'client_home',component: ClientComponent,
        children: [{ path: '',component:HomeClientComponent}]
    },
    {
        path: 'edit',component: ExpertComponent,
        children: [{ path: '',component: EditComponent}]
    },
    {
        path: 'editExpert/:_id',component: ExpertComponent,
        children: [{ path: '',component: EditExpertComponent}]
    },
    {
        path: 'consultation',component: ExpertComponent,
        children: [{ path: '',component: ConsultationComponent}]
    },
    
    {
        path: 'history',component: ExpertComponent,
        children: [{ path: '',component: HistoryComponent}]
    },
    {
        path: 'selectedExpert/:_id',component: ClientComponent,
        children: [{ path: '',component: SelectedExpertComponent}]
    },
    {
        path: 'select',component: ClientComponent,
        children: [{ path: '',component: SelectComponent}]
    },
    {
        path: 'reserve/:_id',component: ClientComponent,
        children: [{ path: '',component: ReservaComponent}]
    },
    {
        path: 'parametre',component: ClientComponent,
        children: [{ path: '',component: ParametreComponent}]
    },
    {
        path: 'parametre_exp',component: ExpertComponent,
        children: [{ path: '',component: ParametreExpertComponent}]
    },
    {
        path: 'expert_home',component: ExpertComponent,
        children: [{ path: '',component: HomeComponent}]
    },
    {
        path: '',redirectTo: '/login',pathMatch: 'full'
    }
];