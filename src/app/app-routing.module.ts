import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { PatientListComponent } from './patient-list/patient-list.component';
import { EditPatientComponent } from './edit-patient/edit-patient.component';

const routes: Routes = [

  { path: 'patient/:id', component: ProfileComponent },
  { path: 'patients', component: PatientListComponent },
  { path: 'edit/:id', component: EditPatientComponent },

  { path: '',   redirectTo: '/patients', pathMatch: 'full' }
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
