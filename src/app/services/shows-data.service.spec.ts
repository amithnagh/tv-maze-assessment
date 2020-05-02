import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ShowsDataService } from './shows-data.service';
import { ShowDetails } from '../models/showDetails.model';
import { TestRequest } from '@angular/common/http/testing';
import { ShowTrackerError } from '../models/showTrackerError.model';
import { SearchShow } from '../models/searchShows.model';
import { HttpRequest } from '@angular/common/http';

describe('ShowsDataService', () => {
  let showsDataService: ShowsDataService;
  let httpTestingController: HttpTestingController;
  const mockShows: ShowDetails[] = require('../mocks/shows.mock.json');
  const mockSearch: SearchShow[] = require('../mocks/search.mock.json');
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ShowsDataService]
    });
    showsDataService = TestBed.get(ShowsDataService);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    const service: ShowsDataService = TestBed.get(ShowsDataService);
    expect(service).toBeTruthy();
  });

  it('should GET all shows', () => {
    showsDataService.getShows().subscribe(
      (data: ShowDetails[]) => {
        expect(data.length).toBe(3);
      }
    );

    const req: TestRequest = httpTestingController.expectOne('http://api.tvmaze.com/shows');
    expect(req.request.method).toEqual('GET');

    req.flush(mockShows);
  });

  it('should GET all shows returned from search', () => {
    const searchTerm = 'all';
    showsDataService.searchShows(searchTerm).subscribe(
      (body: SearchShow[]) => {
        expect(body.length).toBe(3);
      }
    );

    const req: TestRequest = httpTestingController.expectOne(`http://api.tvmaze.com/search/shows?q=${searchTerm}`);

    expect(req.request.method).toBe('GET');

    req.flush(mockSearch);
  });

  it('should GET the details of the show correctly', () => {
    const showId = 1;
    showsDataService.showDetail(showId).subscribe(
      (body: ShowDetails) => {
        expect(body.id).toBe(1);
      }
    );

    const req: TestRequest = httpTestingController.expectOne(`http://api.tvmaze.com/shows/${showId}`);

    expect(req.request.method).toBe('GET');

    req.flush(mockShows[0]);
  });

  it('should return show tracker error', () => {
    showsDataService.getShows().subscribe(
      (data: ShowDetails[]) => fail('this should return an error'),
      (err: ShowTrackerError) => {
        expect(err.errorNumber).toBe(500);
      }
    );

    const req: TestRequest = httpTestingController.expectOne('http://api.tvmaze.com/shows');

    req.flush('err', {
      status: 500,
      statusText: 'Internal Server Error'
    });
  });

  it('should return show tracker error when search api return error', () => {
    const searchTerm = 'all';
    showsDataService.searchShows(searchTerm).subscribe(
      (data: SearchShow[]) => fail('this should return an error'),
      (err: ShowTrackerError) => {
        expect(err.errorNumber).toBe(500);
      }
    );

    const req: TestRequest = httpTestingController.expectOne(`http://api.tvmaze.com/search/shows?q=${searchTerm}`);

    req.flush('err', {
      status: 500,
      statusText: 'Internal Server Error'
    });
  });

  it('should return show tracker error when show detail api return error', () => {
    const showId = 1;
    showsDataService.showDetail(showId).subscribe(
      (data: ShowDetails) => fail('this should return an error'),
      (err: ShowTrackerError) => {
        expect(err.errorNumber).toBe(500);
      }
    );

    const req: TestRequest = httpTestingController.expectOne(`http://api.tvmaze.com/shows/${showId}`);

    req.flush('err', {
      status: 500,
      statusText: 'Internal Server Error'
    });
  });
});
