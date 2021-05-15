import { TestBed } from '@angular/core/testing';

import { CampaignPreviewService } from './campaign-preview.service';

describe('CampaignPreviewService', () => {
  let service: CampaignPreviewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CampaignPreviewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
