import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowCardComponent } from './show-card.component';
import { By } from '@angular/platform-browser';
import { IShowDetails } from '../../models/showDetails.model';

describe('ShowCardComponent', () => {
  let component: ShowCardComponent;
  let fixture: ComponentFixture<ShowCardComponent>;
  const mockShows: IShowDetails[] = require('../../mocks/shows.mock.json');

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ShowCardComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowCardComponent);
    component = fixture.componentInstance;
    component.show = mockShows[0];
    fixture.detectChanges();
  });

  it('should call onClick method', () => {
    spyOn(component, 'onClick');
    fixture.debugElement.query(By.css('.container')).triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(component.onClick).toHaveBeenCalled();
  });

  it('should call emit method', () => {
    spyOn(component.selectedShow, 'emit');
    fixture.debugElement.query(By.css('.container')).triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(component.selectedShow.emit).toHaveBeenCalled();
  });
});
