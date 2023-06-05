import { TestBed, inject } from '@angular/core/testing';

import { SettingsHttpService } from './settings-http.service';

describe('SettingsHttpService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SettingsHttpService]
    });
  });

  it('should be created', inject([SettingsHttpService], (service: SettingsHttpService) => {
    expect(service).toBeTruthy();
  }));
});
