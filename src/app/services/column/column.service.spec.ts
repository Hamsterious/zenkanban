import { TestBed, inject } from '@angular/core/testing';

import { ColumnService } from './column.service';

describe('ColumnService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ColumnService]
    });
  });

  it('should ...', inject([ColumnService], (service: ColumnService) => {
    expect(service).toBeTruthy();
  }));
});
