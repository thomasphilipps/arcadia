import { TestBed } from '@angular/core/testing';

import { BiomeService } from './biome.service';

describe('BiomeService', () => {
  let service: BiomeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BiomeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
