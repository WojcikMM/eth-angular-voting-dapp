import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CampaignListService, CampaignListItem } from './campaign-list.service';
import { filter, mergeMap } from 'rxjs/operators';
import { CreateCampaignModalComponent } from '../modals';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-campaign-list',
  templateUrl: './campaign-list.component.html',
  styleUrls: ['./campaign-list.component.scss']
})
export class CampaignListComponent implements OnInit {
  campaignListItems: CampaignListItem[] = [];

  constructor(private readonly campaignListService: CampaignListService,
              private readonly snackBar: MatSnackBar,
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
        filter((campaignName: string) => !!campaignName),
        mergeMap((campaignName: string) => this.campaignListService.createCampaign$(campaignName))
      ).subscribe(() => {
      this.snackBar.open('Campaign successfully created.', 'Ok');
    });
  }
}
