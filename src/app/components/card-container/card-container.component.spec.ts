import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardContainerComponent } from './card-container.component';
import { Router } from '@angular/router';
import { ShowCardComponent } from '../show-card/show-card.component';
import { By } from '@angular/platform-browser';

describe('CardContainerComponent', () => {
  let component: CardContainerComponent;
  let fixture: ComponentFixture<CardContainerComponent>;
  let mockRouter;
  const showsList = require('../../mocks/shows.mock.json');

  beforeEach(async(() => {
    mockRouter = jasmine.createSpyObj(['navigate']);
    TestBed.configureTestingModule({
      declarations: [
        CardContainerComponent,
        ShowCardComponent ],
      providers: [
          { provide: Router, useValue: mockRouter}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardContainerComponent);
    component = fixture.componentInstance;
    component.showsList = showsList;
    fixture.detectChanges();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call get Details correctly', () => {
    spyOn(fixture.componentInstance, 'selectedShow');
    expect(component.showsList.length).toBe(3);

    const showCards = fixture.debugElement.queryAll(By.directive(ShowCardComponent));

    showCards[0].triggerEventHandler('selectedShow', showCards[0].componentInstance.show.id);
    expect(fixture.componentInstance.selectedShow).toHaveBeenCalledWith(component.showsList[0].id);
  });

  it('should call navigate when selectedshow is called', () => {
    component.selectedShow(2);

    expect(mockRouter.navigate).toHaveBeenCalled();
  });
});
