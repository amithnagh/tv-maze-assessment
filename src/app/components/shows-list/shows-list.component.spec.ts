import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowsListComponent } from './shows-list.component';
import { Router } from '@angular/router';
import { ShowsDataService } from '../../services/shows-data.service';
import { of, Observable, throwError } from 'rxjs';
import { ShowDetails } from '../../models/showDetails.model';
import { ShowCardComponent } from '../show-card/show-card.component';
import { FormsModule } from '@angular/forms';
import { SearchShow } from '../../models/searchShows.model';
import { By } from '@angular/platform-browser';
import { ShowTrackerError } from '../../models/showTrackerError.model';
import { NetworkErrorComponent } from '../network-error/network-error.component';
import { LabelComponent } from '../label/label.component';

describe('ShowsListComponent', () => {
  let component: ShowsListComponent;
  let fixture: ComponentFixture<ShowsListComponent>;
  let mockRouter;
  let mockDataService;
  const mockShows: ShowDetails[] = require('../../mocks/shows.mock.json');
  const mockSearch: SearchShow [] = require('../../mocks/search.mock.json');
  const mockError: ShowTrackerError = require('../../mocks/showTracker.mock.json');

  beforeEach(async(() => {
    mockRouter = jasmine.createSpyObj(['navigate']);
    mockDataService = jasmine.createSpyObj(['getShows', 'searchShows', 'getSearchText', 'setSearchText']);
    TestBed.configureTestingModule({
      declarations: [
        ShowsListComponent,
        ShowCardComponent,
        NetworkErrorComponent,
        LabelComponent
      ],
      providers: [
        { provide: Router, useValue: mockRouter},
        { provide: ShowsDataService, useValue: mockDataService }
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

  it('should call get Details', () => {
    spyOn(fixture.componentInstance, 'selectedShow');
    component.getDisplayList();
    expect(component.topRatedList.length).toBe(1);

    const showCards = fixture.debugElement.queryAll(By.directive(ShowCardComponent));

    showCards[0].triggerEventHandler('selectedShow', showCards[0].componentInstance.show.id);
    expect(fixture.componentInstance.selectedShow).toHaveBeenCalledWith(component.topRatedList[0].id);
  });

  it('should call navigate when selectedshow is called', () => {
    component.selectedShow(2);

    expect(mockRouter.navigate).toHaveBeenCalled();
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

});
