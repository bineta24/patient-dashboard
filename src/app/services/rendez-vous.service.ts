import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import {Patient} from "../models/patient";
import {catchError} from "rxjs/operators";
import {HandleError, HttpErrorHandler} from "../http-error-handler.service";
import { RendezVous } from '../models/rendez-vous';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    Authorization: 'my-auth-token'
  })
};
@Injectable({
  providedIn: 'root'
})
export class RendezVousService {
  baseUrl='http://localhost:3000/rendez-vous'

  private handleError!: HandleError;
  constructor(private http: HttpClient, httpErrorHandler: HttpErrorHandler )
  { this.handleError = httpErrorHandler.createHandleError('RendezVousService'); }

  addRv(data: any): Observable<any> {
    return this.http.post(this.baseUrl, data)
    .pipe(
      catchError(this.handleError('addPatient', data))
    );
  }

  rendezVousList(): Observable<any[]> {

    return this.http.get<[]>(this.baseUrl)
    .pipe(
      catchError(this.handleError('rendezVousList', []))
    );
  }



  
}
