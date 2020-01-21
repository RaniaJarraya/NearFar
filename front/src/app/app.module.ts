// built-in
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
// components
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
//routes
import { appRoutes } from './routes';
import { SignInComponent } from './user/sign-in/sign-in.component';
import { UserService } from './shared/user.service';
//other
import { AuthGuard } from './auth/auth.guard';
import { AuthInterceptor } from './auth/auth.interceptor';
import { EditComponent } from './expert/edit/edit.component';
import { ConsultationComponent } from './expert/consultation/consultation.component';
import { HistoryComponent } from './expert/history/history.component';
import { MaterialModule } from './material.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import{BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToastrModule} from 'ngx-toastr';
import { ClientComponent } from './client/client.component';
import { ExpertComponent } from './expert/expert.component';
import { ReservationComponent } from './client/reservation/reservation.component';
import { History2Component } from './client/history2/history2.component';
import { SearchComponent } from './client/search/search.component';
import { SelectedExpertComponent } from './client/selected-expert/selected-expert.component';
import { ReservaComponent } from './client/reserva/reserva.component';
import { CounterComponent } from './client/reserva/counter.component';
import { EditExpertComponent } from './expert/edit-expert/edit-expert.component';
import { SelectComponent } from './client//select/select.component';
import { ModalComponent } from './client/modal/modal.component';
import { ModalComponent2 } from './expert/modal/modal.component';
import { NotifierModule, NotifierOptions } from 'angular-notifier';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { Modal2Component } from './expert/modal2/modal2.component';
import { ParametreComponent } from './client/parametre/parametre.component';
import { ParametreExpertComponent } from './expert/parametre-expert/parametre-expert.component';
import { HomeComponent } from './expert/home/home.component';
import { HomeClientComponent } from './client/home-client/home-client.component';

const customNotifierOptions: NotifierOptions = {
  position: {
		horizontal: {
			position: 'left',
			distance: 12
		},
		vertical: {
			position: 'bottom',
			distance: 12,
			gap: 10
		}
	},
  theme: 'material',
  behaviour: {
    autoHide: 5000,
    onClick: 'hide',
    onMouseover: 'pauseAutoHide',
    showDismissButton: true,
    stacking: 4
  },
  animations: {
    enabled: true,
    show: {
      preset: 'slide',
      speed: 300,
      easing: 'ease'
    },
    hide: {
      preset: 'fade',
      speed: 300,
      easing: 'ease',
      offset: 50
    },
    shift: {
      speed: 300,
      easing: 'ease'
    },
    overlap: 150
  }
};

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    SignUpComponent,
    SignInComponent,
    EditComponent,
    ConsultationComponent,
    HistoryComponent,
    ClientComponent,
    ExpertComponent,
    ReservationComponent,
    History2Component,
    SearchComponent,
    SelectedExpertComponent,
    ReservaComponent,
    EditExpertComponent,
    SelectComponent,
    ModalComponent, CounterComponent,
    ModalComponent2,
    Modal2Component,
    ParametreComponent,
    ParametreExpertComponent,
    HomeComponent,
    HomeClientComponent
  ],
  imports: [
    NotifierModule,
    NotifierModule.withConfig(customNotifierOptions),
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    MaterialModule,
    NgbModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      toastClass: 'toast toast-bootstrap-compatibility-fix',
      timeOut:4000,
      positionClass:'toast-bottom-full-width',
      preventDuplicates:false
    }),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })

  ],
  entryComponents: [ModalComponent,ModalComponent2,Modal2Component],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  },AuthGuard,UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
