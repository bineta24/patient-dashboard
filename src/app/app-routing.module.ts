import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { PatientListComponent } from './patient-list/patient-list.component';
import { EditPatientComponent } from './edit-patient/edit-patient.component';
import {RendezVousComponent} from "./rendez-vous/rendez-vous.component";
import { TestComponent } from './test/test.component';

const routes: Routes = [

  { path: 'patient/:id', component: ProfileComponent },
  { path: 'patients', component: PatientListComponent },
  { path: 'edit/:id', component: EditPatientComponent },
  { path: 'rv', component: RendezVousComponent },
  { path: 'test', component: TestComponent },


  { path: '',   redirectTo: '/patients', pathMatch: 'full' }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
