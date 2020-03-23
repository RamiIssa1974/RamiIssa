import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { IExam } from 'src/app/Entities/Exam';
import { catchError, tap } from 'rxjs/operators'
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})



export class ExamsService {
  
  examsUrl: string = environment.examsApi;
  
  constructor(private http: HttpClient) { }

  getExams(): Observable<IExam[]> {
    return this.http.get<IExam[]>(this.examsUrl).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(err: HttpErrorResponse) {
    let erorMessage = '';
    if (err.error instanceof ErrorEvent) {
      erorMessage = `An error occured: ${err.error.message}`;
    }
    else {
      erorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(erorMessage);
    return throwError(erorMessage);
  }
}
