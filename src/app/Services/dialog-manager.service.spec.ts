/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DialogManagerService } from './dialog-manager.service';

describe('DialogManagerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DialogManagerService]
    });
  });

  it('should ...', inject([DialogManagerService], (service: DialogManagerService) => {
    expect(service).toBeTruthy();
  }));
});
