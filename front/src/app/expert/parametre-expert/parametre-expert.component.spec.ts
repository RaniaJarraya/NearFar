import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParametreExpertComponent } from './parametre-expert.component';

describe('ParametreExpertComponent', () => {
  let component: ParametreExpertComponent;
  let fixture: ComponentFixture<ParametreExpertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParametreExpertComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParametreExpertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
