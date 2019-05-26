import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkShopViewComponent } from './work-shop-view.component';

describe('WorkShopViewComponent', () => {
  let component: WorkShopViewComponent;
  let fixture: ComponentFixture<WorkShopViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkShopViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkShopViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
