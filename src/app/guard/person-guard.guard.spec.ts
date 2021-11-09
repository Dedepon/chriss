import { TestBed } from "@angular/core/testing";

import { PersonGuardGuard } from "./person-guard.guard";

describe("PersonGuardGuard", () => {
  let guard: PersonGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(PersonGuardGuard);
  });

  it("should be created", () => {
    expect(guard).toBeTruthy();
  });
});
