import { TestBed, inject } from '@angular/core/testing';

import { PhpConnectionService } from './php-connection.service';

describe('PhpConnectionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PhpConnectionService]
    });
  });

  it('should be created', inject([PhpConnectionService], (service: PhpConnectionService) => {
    expect(service).toBeTruthy();
  }));
});
