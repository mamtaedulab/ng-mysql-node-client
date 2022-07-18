import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtraComponentComponent } from './extra-component.component';

describe('ExtraComponentComponent', () => {
  let component: ExtraComponentComponent;
  let fixture: ComponentFixture<ExtraComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExtraComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtraComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
