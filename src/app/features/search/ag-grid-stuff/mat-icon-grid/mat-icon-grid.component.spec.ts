import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatIconGridComponent } from './mat-icon-grid.component';

describe('MatIconGridComponent', () => {
  let component: MatIconGridComponent;
  let fixture: ComponentFixture<MatIconGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatIconGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatIconGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
