import { Injectable } from '@angular/core';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { ShowDetails } from '../models/showDetails.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { ShowTrackerError } from '../models/showTrackerError.model';
import { SearchShow } from '../models/searchShows.model';

@Injectable({
  providedIn: 'root'
})
export class ShowsDataService {
  baseUrl = 'http://api.tvmaze.com/';
  searchKey = new BehaviorSubject<string>('');
  searchList = new BehaviorSubject<SearchShow[]>(null);

  constructor(private http: HttpClient) { }

  getSearchText = (): Observable<string> => this.searchKey.asObservable();

  setSearchText = (search: string): void => this.searchKey.next(search);

  getShows(): Observable<ShowDetails[] | ShowTrackerError> {
    const url = this.baseUrl + 'shows';
    return this.http.get<ShowDetails[]>(url)
      .pipe(
        catchError(err => {
          return this.handleHttpError(err);
        }
        )
      );
  }

  searchShows(searchTerm: string): Observable<SearchShow[] | ShowTrackerError> {
    const url = this.baseUrl + `search/shows?q=${searchTerm}`;
    return this.http.get<SearchShow[]>(url)
      .pipe(
        catchError(err => {
          return this.handleHttpError(err);
        })
      );
  }

  showDetail(showId: number): Observable<ShowDetails | ShowTrackerError> {
    const url = this.baseUrl + `shows/${showId}`;
    return this.http.get<ShowDetails>(url)
      .pipe(
        catchError(err => {
          return this.handleHttpError(err);
        })
      );
  }

  handleHttpError(error: HttpErrorResponse): Observable<ShowTrackerError> {
    const dataError = new ShowTrackerError();
    dataError.errorNumber = error.status;
    dataError.message = error.statusText;
    dataError.friendlyMessage = 'An error occurred while retrieving shows. Please refresh the page';
    return throwError(dataError);
  }
}
