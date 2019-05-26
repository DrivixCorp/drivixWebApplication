import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WinchCompanyViewComponent } from './winch-company-view.component';

describe('WinchCompanyViewComponent', () => {
  let component: WinchCompanyViewComponent;
  let fixture: ComponentFixture<WinchCompanyViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WinchCompanyViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WinchCompanyViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
