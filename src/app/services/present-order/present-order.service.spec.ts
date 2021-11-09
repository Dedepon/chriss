import { TestBed } from "@angular/core/testing";

import { PresentOrderService } from "./present-order.service";

describe("PresentOrderService", () => {
  let service: PresentOrderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PresentOrderService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
