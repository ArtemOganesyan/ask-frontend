import { TestBed, inject } from '@angular/core/testing';

import { AssignmentHttpService } from './assignment-http.service';

describe('AssignmentHttpService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AssignmentHttpService]
    });
  });

  it('should be created', inject([AssignmentHttpService], (service: AssignmentHttpService) => {
    expect(service).toBeTruthy();
  }));
});
