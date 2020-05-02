import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LabelComponent } from './label.component';
import { By } from '@angular/platform-browser';

describe('LabelComponent', () => {
  let component: LabelComponent;
  let fixture: ComponentFixture<LabelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LabelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set value property correctly', () => {
    fixture.componentInstance.label = 'Name';
    fixture.componentInstance.value = 'Arrow';

    fixture.detectChanges();

    const debugElement = fixture.debugElement.query(By.css('span'));

    expect(debugElement.nativeElement.textContent).toBe('Arrow');
  });

  it('should set label property correctly', () => {
    fixture.componentInstance.label = 'Name';
    fixture.componentInstance.value = 'Arrow';

    fixture.detectChanges();

    const debugElement = fixture.debugElement.query(By.css('label'));

    expect(debugElement.nativeElement.textContent).toBe('Name');
  });
});
