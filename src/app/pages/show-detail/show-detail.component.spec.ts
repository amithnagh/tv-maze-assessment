import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowDetailComponent } from './show-detail.component';
import { LabelComponent } from '../../components/label/label.component';
import { ShowsDataService } from '../../services/shows-data.service';
import { of, throwError } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { ShowTrackerError } from '../../models/showTrackerError.model';
import { ShowDetails } from '../../models/showDetails.model';
import { NetworkErrorComponent } from '../../components/network-error/network-error.component';

describe('ShowDetailComponent', () => {
  let component: ShowDetailComponent;
  let fixture: ComponentFixture<ShowDetailComponent>;
  let mockDataService;
  const mockData = require('../../mocks/shows.mock.json');
  const singleShow = mockData[0];
  const mockError: ShowTrackerError = require('../../mocks/showTracker.mock.json');
  let mockRouter;
  beforeEach(async(() => {
    mockRouter = jasmine.createSpyObj(['navigate']);
    mockDataService = jasmine.createSpyObj(['showDetail']);
    TestBed.configureTestingModule({
      declarations: [
        ShowDetailComponent,
        LabelComponent,
        NetworkErrorComponent
       ],
       providers: [
         { provide: ShowsDataService, useValue: mockDataService},
         { provide: ActivatedRoute, useValue: {
          params: of(
            {
              id: 1
            }
          )
        }},
        { provide: Router, useValue: mockRouter }
       ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowDetailComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    mockDataService.showDetail.and.returnValue(of(singleShow));
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should call error', () => {
    mockDataService.showDetail.and.returnValue(throwError(mockError));
    fixture.detectChanges();

    expect(component.error.errorNumber).toBe(500);
  });

});
