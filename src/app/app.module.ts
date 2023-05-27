import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ProfileComponent } from './profile/profile.component';
import { PatientListComponent } from './patient-list/patient-list.component';
import { EditPatientComponent } from './edit-patient/edit-patient.component';
import { NgxPaginationModule } from 'ngx-pagination';
  import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { HttpErrorHandler } from './http-error-handler.service';
import { MessageService } from './message.service';
import { FilterPipe } from './filter.pipe';
import { RendezVousComponent } from './rendez-vous/rendez-vous.component';
import {RendezVousService} from "./services/rendez-vous.service";
import {DatePipe} from "@angular/common";
import {CarouselModule} from "ngx-owl-carousel-o";

import {NgbCarouselConfig, NgbModule} from "@ng-bootstrap/ng-bootstrap";
import { TestComponent } from './test/test.component';
import { NgxCarouselModule } from 'ngx-light-carousel';

import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';


import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';





@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    PatientListComponent,
    EditPatientComponent,
    FilterPipe,
    RendezVousComponent,
    TestComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    NgxPaginationModule,
    ModalModule.forRoot(),
   
    NgbModule,
    BsDatepickerModule.forRoot()
   
    










  ],
  providers: [HttpErrorHandler, MessageService,DatePipe,NgbCarouselConfig],
  bootstrap: [AppComponent]
})
export class AppModule { }
