import { Component } from '@angular/core';
import { CampaignModel, CampaignPreviewService } from './campaign-preview.service';
import { ActivatedRoute } from '@angular/router';
import { AddCandidateModalComponent } from '../modals';
import { filter, mergeMap } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Web3AccountService } from 'ng-web3';

@Component({
  selector: 'app-campaign-preview',
  templateUrl: './campaign-preview.component.html',
  styleUrls: ['./campaign-preview.component.scss']
})
export class CampaignPreviewComponent {
  campaignModel?: CampaignModel;

  constructor(private readonly _activatedRoute: ActivatedRoute,
              private readonly _dialog: MatDialog,
              private readonly _snackBar: MatSnackBar,
              private readonly _web3AccountService: Web3AccountService,
              private readonly _campaignPreviewService: CampaignPreviewService) {
    _campaignPreviewService.initializeContract(_activatedRoute.snapshot.paramMap.get('id') || '');
    _campaignPreviewService.getCampaign$()
      .subscribe((campaignModel: CampaignModel) => {
        this.campaignModel = campaignModel;
      });
  }

  onAddCandidateClicked(): void {
    this._dialog.open(AddCandidateModalComponent, {width: '250px'})
      .afterClosed()
      .pipe(
        filter((candidateName: string) => !!candidateName),
        mergeMap((candidateName: string) => this._campaignPreviewService.addCandidate$(candidateName, {
          from: this._web3AccountService.connectedAccountSnapshot
        }))
      ).subscribe(() => {
      this._snackBar.open('Candidate successfully added.', 'Ok');
    });
  }
}
