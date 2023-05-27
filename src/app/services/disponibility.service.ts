import { Injectable } from '@angular/core';
import { HandleError, HttpErrorHandler } from '../http-error-handler.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    Authorization: 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})
export class DisponibilityService {

  baseUrl='http://localhost:3000/disponibilities'

  private handleError!: HandleError;
  constructor(private http: HttpClient, httpErrorHandler: HttpErrorHandler )
  { this.handleError = httpErrorHandler.createHandleError('RendezVousService'); }

  getDisponibilityList(): Observable<any[]> {

    return this.http.get<[]>(this.baseUrl)
      .pipe(
        catchError(this.handleError('getDisponibilityList', []))
      );
  }
}
