import { Injectable } from '@angular/core';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { IShowDetails } from '../models/showDetails.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { ShowTrackerError } from '../models/showTrackerError.model';
import { ISearchShow } from '../models/searchShows.model';

@Injectable({
  providedIn: 'root'
})
export class ShowsDataService {
  baseUrl = 'http://api.tvmaze.com/';
  searchKey = new BehaviorSubject<string>('');
  searchList = new BehaviorSubject<ISearchShow[]>(null);

  constructor(private http: HttpClient) { }

  // code to return search key string as observable to the subscribing components
  getSearchText = (): Observable<string> => this.searchKey.asObservable();

  // code to update the search key
  setSearchText = (search: string): void => this.searchKey.next(search);

  // api calls to fetch the shows details
  getShows(): Observable<IShowDetails[] | ShowTrackerError> {
    const url = this.baseUrl + 'shows';
    return this.http.get<IShowDetails[]>(url)
      .pipe(
        catchError(err => {
          return this.handleHttpError(err);
        }
        )
      );
  }

  // api calls to fetch the details related to the search key
  searchShows(searchTerm: string): Observable<ISearchShow[] | ShowTrackerError> {
    const url = this.baseUrl + `search/shows?q=${searchTerm}`;
    return this.http.get<ISearchShow[]>(url)
      .pipe(
        catchError(err => {
          return this.handleHttpError(err);
        })
      );
  }

  // api calls for fetching the details of a seleted show
  showDetail(showId: number): Observable<IShowDetails | ShowTrackerError> {
    const url = this.baseUrl + `shows/${showId}`;
    return this.http.get<IShowDetails>(url)
      .pipe(
        catchError(err => {
          return this.handleHttpError(err);
        })
      );
  }

  // handles the http error and stores the related data in show tracker error object
  handleHttpError(error: HttpErrorResponse): Observable<ShowTrackerError> {
    const dataError = new ShowTrackerError();
    dataError.errorNumber = error.status;
    dataError.message = error.statusText;
    dataError.friendlyMessage = 'An error occurred while retrieving shows. Please refresh the page';
    return throwError(dataError);
  }
}
