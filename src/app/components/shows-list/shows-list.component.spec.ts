import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ShowsListComponent } from './shows-list.component';
import { ShowsDataService } from '../../services/shows-data.service';
import { of, Observable, throwError } from 'rxjs';
import { IShowDetails } from '../../models/showDetails.model';
import { ShowCardComponent } from '../show-card/show-card.component';
import { FormsModule } from '@angular/forms';
import { ISearchShow } from '../../models/searchShows.model';
import { By } from '@angular/platform-browser';
import { ShowTrackerError } from '../../models/showTrackerError.model';
import { NetworkErrorComponent } from '../network-error/network-error.component';
import { LabelComponent } from '../label/label.component';
import { CardContainerComponent } from '../card-container/card-container.component';
import { Router } from '@angular/router';

describe('ShowsListComponent', () => {
  let component: ShowsListComponent;
  let fixture: ComponentFixture<ShowsListComponent>;
  let mockDataService;
  const mockShows: IShowDetails[] = require('../../mocks/shows.mock.json');
  const mockSearch: ISearchShow [] = require('../../mocks/search.mock.json');
  const mockError: ShowTrackerError = require('../../mocks/showTracker.mock.json');
  let mockRouter;

  beforeEach(async(() => {
    mockRouter = jasmine.createSpyObj(['navigate']);
    mockDataService = jasmine.createSpyObj(['getShows', 'searchShows', 'getSearchText', 'setSearchText']);
    TestBed.configureTestingModule({
      declarations: [
        ShowsListComponent,
        ShowCardComponent,
        NetworkErrorComponent,
        LabelComponent,
        CardContainerComponent
      ],
      providers: [
        { provide: ShowsDataService, useValue: mockDataService },
        { provide: Router, useValue: mockRouter}
      ],
      imports: [
        FormsModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowsListComponent);
    component = fixture.componentInstance;
    mockDataService.getShows.and.returnValue(of(mockShows));
    mockDataService.getSearchText.and.returnValue({subscribe: (text) => {}});
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initiate the showList correctly', () => {
    expect(component.showList.length).toBe(3);
  });

  it('should get unique Genres correctly', () => {
    expect(component.genres.size).toBe(7);
  });

  it('should set searchList correctly', () => {
    mockDataService.searchShows.and.returnValue(of(mockSearch));
    component.searchText = 'game';

    component.search(component.searchText);

    expect(mockDataService.searchShows).toHaveBeenCalledWith('game');
    expect(component.searchShowList.length).toBe(3);
  });

  it('should call get DisplayList and assign correct values to top rated and genre list', () => {
    component.getDisplayList();

    expect(component.topRatedList.length).toBe(1);
    expect(component.selectedGenreList.length).toBe(2);
  });

  it('should toggle show genre dropdown ', () => {
    component.showGenresDropdown = true;
    component.showGenres();

    expect(component.showGenresDropdown).toBe(false);
  });

  it('should clear search text ', () => {
    component.searchText = 'game';
    component.clearSearch();

    expect(mockDataService.setSearchText).toHaveBeenCalledWith('');
  });

  it('should call the search method with correct parameters', () => {
    spyOn(component, 'search');
    mockDataService.getSearchText.and.returnValue(of('game'));
    component.subscribeToSearch();
    expect(component.search).toHaveBeenCalledWith('game');
  });

  it('should not call the search method', () => {
    spyOn(component, 'search');
    mockDataService.getSearchText.and.returnValue(of(''));
    component.subscribeToSearch();
    expect(component.search).not.toHaveBeenCalled();
  });

  it('should not call from Event of rxjs if searchShowList is empty', () => {
    const searchText = 'abcdef';
    mockDataService.searchShows.and.returnValue(of([]));

    component.search(searchText);

    expect(component.searchShowDetails.length).toBe(0);
  });

});
