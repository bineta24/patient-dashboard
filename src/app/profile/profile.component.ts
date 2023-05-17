import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PatientsService } from '../services/patients.service';
import { Patient } from '../models/patient';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  currentPatient: Patient = {
    nom: '',
    prenom: '',
    groupeSanguin: '',
    id: 0,
    dateNaiss: '',
    sexe: '',
    profession: '',
    adresse: '',
    email: '',
    numero: ''
  };
  patients!: Patient[];

  constructor( private patientService: PatientsService,
    private route: ActivatedRoute,
    private router: Router) { }




  ngOnInit(): void {
  
     this.getPatientList();
    console.log(this.currentPatient.prenom)
   
  }

  // getPatient(id: string): void {
  //   this.patientService.get(id)
  //     .subscribe(
  //       data => {
  //         this.currentPatient = data;
  //         console.log(data);
  //       },
  //       error => {
  //         console.log(error);
  //       });
  // }


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


}
