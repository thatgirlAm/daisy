import { TestBed } from '@angular/core/testing';

import { ErrorCodeServiceService } from './error-code-service.service';

describe('ErrorCodeServiceService', () => {
  let service: ErrorCodeServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ErrorCodeServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
