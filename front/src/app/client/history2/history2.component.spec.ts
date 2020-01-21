import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { History2Component } from './history2.component';

describe('History2Component', () => {
  let component: History2Component;
  let fixture: ComponentFixture<History2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ History2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(History2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
