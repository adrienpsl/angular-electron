import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgMatSelectComponent } from './ag-mat-select.component';

describe('AgMatSelectComponent', () => {
  let component: AgMatSelectComponent;
  let fixture: ComponentFixture<AgMatSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgMatSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgMatSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
