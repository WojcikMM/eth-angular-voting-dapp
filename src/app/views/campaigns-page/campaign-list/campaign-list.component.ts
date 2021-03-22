import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { CampaignListItem, CampaignListService } from './campaign-list.service';

@Component({
  selector: 'app-campaign-list',
  templateUrl: './campaign-list.component.html',
  styleUrls: ['./campaign-list.component.scss']
})
export class CampaignListComponent {
  campaigns$: Observable<CampaignListItem[]>;

  constructor(private campaignListService: CampaignListService) {
    this.campaigns$ = campaignListService.getCampaignsList$();
  }

}
