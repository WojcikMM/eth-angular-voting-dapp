import { Component } from '@angular/core';
import { CampaignModel, CampaignPreviewService } from './campaign-preview.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-campaign-preview',
  templateUrl: './campaign-preview.component.html',
  styleUrls: ['./campaign-preview.component.scss']
})
export class CampaignPreviewComponent {
  campaignModel?: CampaignModel;

  constructor(private readonly _activatedRoute: ActivatedRoute,
              private readonly _campaignPreviewService: CampaignPreviewService) {
    _campaignPreviewService.initializeContract(_activatedRoute.snapshot.paramMap.get('id') || '');
    _campaignPreviewService.getCampaign$()
      .subscribe((campaignModel: CampaignModel) => {
        this.campaignModel = campaignModel;
      });
  }
}
