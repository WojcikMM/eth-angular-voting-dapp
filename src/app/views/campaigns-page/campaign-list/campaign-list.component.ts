import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CampaignListItem, CampaignListService } from './campaign-list.service';
import { mergeMap } from 'rxjs/operators';
import { CreateCampaignModalComponent } from '../modals';

@Component({
  selector: 'app-campaign-list',
  templateUrl: './campaign-list.component.html',
  styleUrls: ['./campaign-list.component.scss']
})
export class CampaignListComponent implements OnInit {
  campaignListItems: CampaignListItem[] = [];

  constructor(private readonly campaignListService: CampaignListService,
              private readonly dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.campaignListService.getCampaignsList$().subscribe(campaigns => {
      this.campaignListItems = [
        ...this.campaignListItems,
        ...campaigns
      ];
    });


    this.campaignListService.campaignCreatedEvent$().subscribe(newCampaign => {
      this.campaignListItems = [...this.campaignListItems, newCampaign];
    });
  }

  onCreateCampaignClicked(): void {
    this.dialog.open(CreateCampaignModalComponent, {width: '250px'})
      .afterClosed()
      .pipe(
        mergeMap((campaignName: string) => this.campaignListService.createCampaign$(campaignName))
      ).subscribe();
  }
}
