import { TestBed } from '@angular/core/testing';

import { BorrowhistoryService } from './borrowhistory.service';

describe('BorrowhistoryService', () => {
  let service: BorrowhistoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BorrowhistoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
