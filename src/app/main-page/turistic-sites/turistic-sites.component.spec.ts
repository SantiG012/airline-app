import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TuristicSitesComponent } from './turistic-sites.component';

describe('TuristicSitesComponent', () => {
  let component: TuristicSitesComponent;
  let fixture: ComponentFixture<TuristicSitesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TuristicSitesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TuristicSitesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
