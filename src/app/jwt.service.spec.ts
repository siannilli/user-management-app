import {
  beforeEachProviders,
  it,
  describe,
  expect,
  inject
} from '@angular/core/testing';
import { JwtService } from './jwt.service';

describe('Jwt Service', () => {
  beforeEachProviders(() => [JwtService]);

  it('should ...',
      inject([JwtService], (service: JwtService) => {
    expect(service).toBeTruthy();
  }));
});
