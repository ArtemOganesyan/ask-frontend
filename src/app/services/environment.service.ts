import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';

@Injectable()
export class EnvironmentService {

  constructor() { }

  getAPIUrl(): string {
    return environment.API;
  }

}
