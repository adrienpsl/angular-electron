import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoToFileComponent } from './go-to-file.component';

describe('GoToFileComponent', () => {
  let component: GoToFileComponent;
  let fixture: ComponentFixture<GoToFileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoToFileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoToFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
