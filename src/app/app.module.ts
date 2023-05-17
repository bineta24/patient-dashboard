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
// import { NgSearchPipe } from 'ng-search-pipe';



@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    PatientListComponent,
    EditPatientComponent,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    NgxPaginationModule,
    ModalModule.forRoot(),
    // Ng2SearchPipeModule

    // NgSearchPipe






  ],
  providers: [HttpErrorHandler, MessageService,],
  bootstrap: [AppComponent]
})
export class AppModule { }
