import { Component, TemplateRef, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Patient } from '../models/patient';
import { PatientsService } from '../services/patients.service';

@Component({
  selector: 'app-edit-patient',
  templateUrl: './edit-patient.component.html',
  styleUrls: ['./edit-patient.component.css']
})
export class EditPatientComponent {




  modalRef!: BsModalRef;
  @ViewChild('template')
  templateRef!: TemplateRef<any>;


  patient: Patient = {
    prenom: '',
    nom: '',
    dateNaiss: '',
    id: 0,
    groupeSanguin: '',
    sexe: '',
    profession: '',
    adresse: '',
    email: '',
    numero: ''
  };
  message!: string;






  constructor(public modalService: BsModalService, private patientService: PatientsService){}


  updatePatient(): void {
    this.message = '';
  
    this.patientService.update(this.patient.id, this.patient)
      .subscribe(
        response => {
          console.log(response);
          this.message = response.message ? response.message : 'This patient was updated successfully!';
        },
        error => {
          console.log(error);
        });
  }

}
