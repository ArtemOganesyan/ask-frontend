import { TestBed, inject } from '@angular/core/testing';

import { QuizHttpService } from './quiz-http.service';

describe('QuizHttpService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [QuizHttpService]
    });
  });

  it('should be created', inject([QuizHttpService], (service: QuizHttpService) => {
    expect(service).toBeTruthy();
  }));
});
