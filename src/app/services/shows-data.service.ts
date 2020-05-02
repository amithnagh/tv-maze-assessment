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
  url: string;
  searchKey = new BehaviorSubject<string>('');
  searchList = new BehaviorSubject<SearchShow[]>(null);
  searchKeyValue: string;
  constructor(private http: HttpClient) { }

  getSearchText() {
    return this.searchKey.asObservable();
  }

  setSearchText(search: string) {
    this.searchKey.next(search);
  }

  // setSearchText(search: string) {
  //   this.searchKey.next(search);
  //   this.searchKey.subscribe(search => this.searchKeyValue = search);
  //   this.searchShows(this.searchKeyValue).subscribe(
  //     (body: Sear)
  //   );
  // }

  getShows(): Observable<ShowDetails[] | ShowTrackerError> {
    this.url = 'http://api.tvmaze.com/shows';
    return this.http.get<ShowDetails[]>(this.url)
      .pipe(
        catchError(err => {
          return this.handleHttpError(err);
        }
        )
      );
  }

  searchShows(searchTerm: string): Observable<SearchShow[] | ShowTrackerError> {
    this.url = `http://api.tvmaze.com/search/shows?q=${searchTerm}`;
    return this.http.get<SearchShow[]>(this.url)
      .pipe(
        catchError(err => {
          return this.handleHttpError(err);
        })
      );
  }

  showDetail(showId: number): Observable<ShowDetails | ShowTrackerError> {
    this.url = `http://api.tvmaze.com/shows/${showId}`;
    return this.http.get<ShowDetails>(this.url)
      .pipe(
        catchError(err => {
          return this.handleHttpError(err);
        })
      );
  }

  handleHttpError(error: HttpErrorResponse): Observable<ShowTrackerError> {
    // console.log(error);
    const dataError = new ShowTrackerError();
    dataError.errorNumber = error.status;
    dataError.message = error.statusText;
    dataError.friendlyMessage = 'An errror occurred while retrieving shows';
    return throwError(dataError);
  }
}
