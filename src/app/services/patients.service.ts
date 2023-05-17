import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Patient } from '../models/patient';
import { catchError } from 'rxjs/operators';
import { HttpErrorHandler, HandleError } from '../http-error-handler.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    Authorization: 'my-auth-token'
  })
};


@Injectable({
  providedIn: 'root'
})
export class PatientsService {
baseUrl='http://localhost:3000/patients'

private handleError!: HandleError;

  constructor(private http: HttpClient, httpErrorHandler: HttpErrorHandler ) 
  { this.handleError = httpErrorHandler.createHandleError('PatientsService'); }


  addPatient(data: any): Observable<any> {
    return this.http.post(this.baseUrl, data)
    .pipe(
      catchError(this.handleError('addPatient', data))
    );
  }

  getPatientList(): Observable<Patient[]> {

    return this.http.get<Patient[]>(this.baseUrl)
    .pipe(
      catchError(this.handleError('getPatientList', []))
    );
  }

  get(id: any): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`)
    .pipe(
      catchError(this.handleError('get'))
    );
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, data)
    .pipe(
      catchError(this.handleError('update', data))
    );
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`)
     .pipe(
        catchError(this.handleError('delete'))
      );
  }


}
