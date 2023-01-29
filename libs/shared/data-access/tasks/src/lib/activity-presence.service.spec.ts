import { TestBed } from '@angular/core/testing';

import { ActivityPresenceService } from './activity-presence.service';

describe('ActivityPresenceService', () => {
  let service: ActivityPresenceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActivityPresenceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
