import { TestBed } from '@angular/core/testing';

import { SureGuard } from './sure.guard';

describe('SureGuard', () => {
  let guard: SureGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(SureGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
