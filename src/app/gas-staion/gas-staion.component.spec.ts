import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GasStaionComponent } from './gas-staion.component';

describe('GasStaionComponent', () => {
  let component: GasStaionComponent;
  let fixture: ComponentFixture<GasStaionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GasStaionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GasStaionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
