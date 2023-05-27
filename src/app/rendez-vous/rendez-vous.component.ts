import {Component, OnInit, AfterViewInit, OnDestroy, ViewChild, Renderer2, ElementRef, NgModule} from '@angular/core';
import {RendezVousService} from "../services/rendez-vous.service";

// @ts-ignore

import { default as moment } from 'moment';
import 'moment/locale/fr';

import Swal from 'sweetalert2';
import { DisponibilityService } from '../services/disponibility.service';
import { RendezVous } from '../models/rendez-vous';
import { formatDate } from '@angular/common';


@Component({
  selector: 'app-rendez-vous',
  templateUrl: './rendez-vous.component.html',
  styleUrls: ['./rendez-vous.component.css']
})



export class RendezVousComponent implements OnInit {
 
  selectedDate!: string;

  rendezVousList!: any[];
  
  creneauxParJour: { [key: string]: any[] } = {};
  //jours: string[] = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi"];

  daysOfWeek!: string[];
 
  startIndex: number = 0;


  hours: number[] = [];


  moment = moment;
  minutes: number[] = [];

  availabilitySlots: string[] = [];
  
  availabilityDays: { date: string, slots: string[] }[] = [];
  
 // availabilityDays: { date: string, slots: { time: string, color: string }[] }[] = [];


  constructor(private dispoService:DisponibilityService,private renderer: Renderer2, private elRef: ElementRef, private rendezVousService: RendezVousService) {
    
  }


  ngOnInit(): void {
    this.getDisponibilityList();
    this.getRendezVousList();

      
this.selectedDate = ''; // Initialisez selectedDate avec une valeur par défaut
  
 
//this.rendezVousList = []; 


  }






  
  
 
  
  


  
  
  
  


  
 
  
  getDisponibilityList() {
    this.dispoService.getDisponibilityList().subscribe(
      data => {
        const interval = 15;
        const slotsByDay = new Map<string, string[]>();
  
        for (const slot of data) {
          const startTime = moment(slot.startTime);
          const endTime = moment(slot.endTime);
          while (startTime < endTime) {
            const dayKey = startTime.format('YYYY-MM-DD');
            const timeSlot = startTime.toISOString();
  
            if (!slotsByDay.has(dayKey)) {
              slotsByDay.set(dayKey, []);
            }
            slotsByDay.get(dayKey)?.push(timeSlot);
            startTime.add(interval, 'minutes');
          }
        }
  
        const startDate = moment();
        const endDate = moment(startDate).add(30, 'days');
  
        const currentDate = moment(startDate);
        while (currentDate <= endDate) {
          const dayKey = currentDate.format('YYYY-MM-DD');
          const slots = slotsByDay.get(dayKey) || [];
          const date = currentDate.format('dddd,DD-MM-YYYY');
          this.availabilityDays.push({ date, slots });
  
          currentDate.add(1, 'day');
        }
      }
    );
  }



  
 
  
  
  


  // getDisponibilityList() {
  //   const creneauxParJour: Record<string, any[]> = {};
  
  //   this.dispoService.getDisponibilityList().subscribe(
  //     disponibilites => {
  //       console.log("=>",disponibilites, typeof(disponibilites))
  //       disponibilites?.forEach(dispo => {
  //         const debut = moment(dispo.starTime);
  //         const fin = moment(dispo.endTime);
      
  
  //         const diff = fin.diff(debut);
  //         //console.log("=>", debut, fin,diff)
        
  //         const dureeEnMinute = moment.duration(diff).asMinutes();
  //         const nbCreneaux = Math.floor(dureeEnMinute / 15);
  //         //console.log("=>",  diff, nbCreneaux)
  
  //         for (let i = 0; i < nbCreneaux; i++) {
  //           const creneauDebut = moment(debut).add(i * 15, 'minutes').format('YYYY-MM-DD HH:mm:ss');
  //           const creneauFin = moment(creneauDebut).add(15, 'minutes').format('YYYY-MM-DD HH:mm:ss');
  //           const jour = moment(creneauDebut).format('YYYY-MM-DD');
  //           let creneauPris = false;
            

  //           this.rendezVousService.rendezVousList().subscribe( renVous => {
  //               renVous.forEach(rv =>{
  //             const rvDebut = moment(rv.dateRv + ' ' + rv.heureRv);
  //             const rvFin = moment(rv.dateRv + ' ' + rv.heureRv).add(15, 'minutes');
  //           console.log(rvDebut);
  //             if (moment(creneauDebut).isBetween(rvDebut, rvFin) || moment(creneauFin).isBetween(rvDebut, rvFin)) {
  //               creneauPris = true;
  //             }
            
  //           })});
            
  
  //           if (!creneauxParJour[jour]) {
  //             creneauxParJour[jour] = [];
  //           }
  
  //           const backgroundColor = creneauPris ? 'red' : 'green';
  //           creneauxParJour[jour].push({ start: creneauDebut, end: creneauFin, title: dispo.title, backgroundColor });
  //         }
  //       });
  
  //       return creneauxParJour;
    
  //     },
  //     error => {
  //       console.log('Erreur lors de la récupération des disponibilités :', error);
  //       return null;
  //     }
  //   );
  // }


 




  confirmAppointment(slot: string) {
   // const formattedSlot = this.datePipe.transform(slot, 'HH:mm');
  
    Swal.fire({
      title: 'Confirmation',
     // text: `Voulez-vous prendre un rendez-vous pour ${formattedSlot} ?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Oui',
      cancelButtonText: 'Non'
    }).then((result) => {
      if (result.isConfirmed) {
        // Le rendez-vous est confirmé, vous pouvez effectuer des actions supplémentaires ici
        console.log('Rendez-vous confirmé pour', slot);
        this.addRv(this.getDateFromSlot(slot), this.getTimeFromSlot(slot));
  
        Swal.fire({
          title: 'Succès',
          text: 'Rendez-vous pris avec succès',
          icon: 'success'
        });
      } else {
        // L'utilisateur a annulé le rendez-vous
        console.log('Rendez-vous annulé');
      }
    });
  }
  
  
  getDateFromSlot(slot: string): string {
    // Logique pour extraire la date du slot
    // Par exemple, si le slot est au format 'YYYY-MM-DD HH:mm', vous pouvez extraire la date de cette manière :
    return slot.substr(0, 10);
  }
  
  getTimeFromSlot(slot: string): string {
    // Logique pour extraire l'heure du slot
    // Par exemple, si le slot est au format 'YYYY-MM-DD HH:mm', vous pouvez extraire l'heure de cette manière :
    return slot.substr(11, 5);
  }

 
 
  
  
  
  
  
  
addRv(date: string, slot: string) {
  // Envoyer la date et le slot au backend pour être enregistrés
   const rendezVous : RendezVous ={
    dateRv: date,
    heureRv: slot,
    id: 0,
    frais: 0,
    room: '',
    token: '',
    raisonMedical: '',
    priorite: '',
    statut: '',
    consultation: undefined,
    patient: undefined,
    professionnelSante: undefined,
    typeRendezVous: undefined
  };

  this.rendezVousService.addRv(rendezVous).subscribe(
    response => {
      console.log('Rendez-vous ajouté avec succès', response);
      // Effectuer des actions supplémentaires si nécessaire
    },
    error => {
      console.error('Erreur lors de l\'ajout du rendez-vous', error);
      // Gérer l'erreur ou afficher un message d'erreur à l'utilisateur
    }
  );
}



 


  scrollRight() {
    if (this.startIndex + 4 < this.availabilityDays.length) {
      this.startIndex += 1;
    }
  }
  scrollLeft() {
    if (this.startIndex > 0) {
      this.startIndex -= 1;
    }
  }





 
  
  

  getRendezVousList() {
    this.rendezVousService.rendezVousList().subscribe(
      data => {
        this.rendezVousList = data;
        console.log(data);
        
      },
      error => {
        console.log('Erreur lors de la récupération des rendez-vous :', error);
      }
    );
  }
 
  


  
}







