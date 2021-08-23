import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators'

@Injectable()
export class InterceptorService implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    req = req.clone({
      setHeaders: {
        'x-rapidapi-key': '9701b3d33dmshe0c4e44ee2c6911p1ecf0djsn4817d537526f',
        'x-rapidapi-host': 'rawg-video-games-database.p.rapidapi.com',
      },
      setParams: {
        key: 'df94894bf53949a5b4b59c6f91aedcfa',
      }
    });
    return next.handle(req).pipe(
      catchError(this.manageError));
  }

  manageError(error: HttpErrorResponse) {
    console.warn(error);
    return throwError(error);
  }
}
