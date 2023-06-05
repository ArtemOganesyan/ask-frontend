import { TestBed, inject } from '@angular/core/testing';

import { TakeQuizService } from './take-quiz.service';

describe('TakeQuizService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TakeQuizService]
    });
  });

  it('should be created', inject([TakeQuizService], (service: TakeQuizService) => {
    expect(service).toBeTruthy();
  }));
});
