import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NetworkErrorComponent } from './network-error.component';
import { LabelComponent } from '../label/label.component';
import { ShowTrackerError } from '../../models/showTrackerError.model';

describe('NetworkErrorComponent', () => {
  let component: NetworkErrorComponent;
  let fixture: ComponentFixture<NetworkErrorComponent>;
  const error = require('../../mocks/showTracker.mock.json');

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NetworkErrorComponent,
      LabelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NetworkErrorComponent);
    component = fixture.componentInstance;
    component.errorObj = error;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
