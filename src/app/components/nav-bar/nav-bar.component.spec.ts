import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavBarComponent } from './nav-bar.component';
import { ShowsDataService } from '../../services/shows-data.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
describe('NavBarComponent', () => {
  let component: NavBarComponent;
  let fixture: ComponentFixture<NavBarComponent>;
  let mockDataService: ShowsDataService;
  let mockRouter;

  beforeEach(async(() => {
    mockDataService = jasmine.createSpyObj(['setSearchText']);
    // mockRouter = jasmine.createSpyObj(['navigate']);
    mockRouter = {
      navigate: () => {},
      url: '/shows/2'
    };
    TestBed.configureTestingModule({
      declarations: [NavBarComponent],
      providers: [
        { provide: ShowsDataService, useValue: mockDataService },
        { provide: Router, useValue: mockRouter }
      ],
      imports: [
        FormsModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should make a call to GotoHome function', () => {
    spyOn(component, 'goToHome');

    fixture.debugElement.query(By.css('.brand')).triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(component.goToHome).toHaveBeenCalled();
  });

  it('should call setSearch text with correct value if length >2', () => {
    component.searchText = 'Game';
    fixture.detectChanges();
    component.onEnterPress();
    expect(mockDataService.setSearchText).toHaveBeenCalledWith('Game');
  });

  it('should not call setSearch text with correct value if length <2', () => {
    component.searchText = 'Ga';
    fixture.detectChanges();
    component.onEnterPress();
    expect(mockDataService.setSearchText).not.toHaveBeenCalled();
  });

});
