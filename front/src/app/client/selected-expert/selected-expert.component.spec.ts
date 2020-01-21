import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedExpertComponent } from './selected-expert.component';

describe('SelectedExpertComponent', () => {
  let component: SelectedExpertComponent;
  let fixture: ComponentFixture<SelectedExpertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectedExpertComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectedExpertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
