import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PresentDetailsComponent } from './present-details.component';

describe('PresentDetailsComponent', () => {
  let component: PresentDetailsComponent;
  let fixture: ComponentFixture<PresentDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PresentDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PresentDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
