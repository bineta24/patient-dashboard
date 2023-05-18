
import { Component,TemplateRef, OnInit, ViewChild } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { FormGroup } from '@angular/forms';
import { Patient } from '../models/patient';
import { PatientsService } from '../services/patients.service';
import { ActivatedRoute, Router } from '@angular/router';

import Swal from 'sweetalert2';






@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.css']
})
export class PatientListComponent {

  title = 'modal-app';
  //patientForm!: FormGroup;
  submitted = false;
  searchText!: '';

  page: number = 1;
  count: number = 0;
  tableSize: number = 3;
  tableSizes: any = [3, 6, 9, 12];



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

  patients :any;


  modalRef!: BsModalRef;
  @ViewChild('template')
  templateRef!: TemplateRef<any>;
  message!: string;
constructor(public modalService: BsModalService, private patientService: PatientsService, private router: Router,private route: ActivatedRoute,) {}

ngOnInit() {
this.getPatientList();
}



openModal(template: TemplateRef<any>,id: any) {
  const user = {
      id: 10
    };
    this.getPatient(id)
  this.modalRef = this.modalService.show(template, {

  });
}

openDeleteModal(template: TemplateRef<any>,id: any) {
  const user = {
      id: 10
    };
    this.getPatient(id),
  this.modalRef = this.modalService.show(template, {

  });
}


openAddModal(template: TemplateRef<any>) {

  this.modalRef = this.modalService.show(template, {

  });


}

getPatientList(){
  this.patientService.getPatientList().subscribe(
    data => {
      this.patients = data;
      console.log(data);
    },
    error => {
      console.log(error);
    });

}







addPatient() {

  this.patientService.addPatient(this.patient).subscribe(
    (response) => {

     this.alertWithSuccess()
      console.log(response);
     // window.location.reload();

    } ,

    (error) => {
      console.error('Erreur lors de l\'ajout du patient:', error);
    }
  );
}






updatePatient(): void {
  this.patientService.update(this.patient.id, this.patient)
    .subscribe(
      response => {
        this.alertWithSuccess();
        console.log(response);
        // window.location.reload();

      },
      error => {
        console.log(error);
      });

}


getPatient(id: number): void {
  this.patientService.get(id)
    .subscribe(
      data => {
        this.patient = data;
        console.log(data);
      },
      error => {
        console.log(error);
      });
}

onTableDataChange(event: any) {
  this.page = event;
  this.getPatientList();
}
onTableSizeChange(event: any): void {
  this.tableSize = event.target.value;
  this.page = 1;
  this.getPatientList();
}




  alertWithSuccess(){
    Swal.fire('Mercii...', 'Votre patient a été crée avec succés!', 'success', )
     this.modalRef.hide()
     //window.location.reload();
    this.ngOnInit();

  }






confirmBox(): void {

  Swal.fire({
    title: 'Etes-vous sûre de vouloir supprimer?',
    text: 'Vous ne pourrez pas récupérer ce patient !!',
    icon: 'warning',
    showCancelButton: true,

    cancelButtonText: 'Non, garder le',
    confirmButtonText: 'oui, supprimez-le!'
  }).then((result) => {
    if (result.value) {
      Swal.fire(
        'Supprimé!',
        'Votre patient a été supprimé avec succés.',
        'success'
      )
      this.ngOnInit();

    } else if (result.dismiss === Swal.DismissReason.cancel) {
      Swal.fire(
        'Supprimé',
        'Suppression anullée :)',
        'error'
      )
    }
  })
}

       // window.location.reload();

       deletePatient(id:number): void {
        this.patientService.delete(id)
          .subscribe(
            response => {
              this.confirmBox();

              console.log(response);
            },
            error => {
              console.log(error);
            });

          }


}
