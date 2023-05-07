import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaneTopComponent } from './plane-top.component';

describe('PlaneTopComponent', () => {
  let component: PlaneTopComponent;
  let fixture: ComponentFixture<PlaneTopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlaneTopComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlaneTopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
