import { TestBed, inject } from '@angular/core/testing';

import { QuizBuilderService } from './quiz-builder.service';

describe('QuizBuilderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [QuizBuilderService]
    });
  });

  it('should be created', inject([QuizBuilderService], (service: QuizBuilderService) => {
    expect(service).toBeTruthy();
  }));
});
