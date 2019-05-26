import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WinchViewComponent } from './winch-view.component';

describe('WinchViewComponent', () => {
  let component: WinchViewComponent;
  let fixture: ComponentFixture<WinchViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WinchViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WinchViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
