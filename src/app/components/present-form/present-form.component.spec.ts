import { ComponentFixture, TestBed } from "@angular/core/testing";

import { PresentFormComponent } from "./present-form.component";

describe("PresentFormComponent", () => {
  let component: PresentFormComponent;
  let fixture: ComponentFixture<PresentFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PresentFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PresentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
