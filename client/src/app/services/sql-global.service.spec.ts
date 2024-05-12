import { TestBed } from '@angular/core/testing';

import { SqlGlobalService } from './sql-global.service';

describe('SqlGlobalService', () => {
  let service: SqlGlobalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SqlGlobalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
