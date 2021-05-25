import { Component } from '@angular/core';
import {
  CampaignModel,
  CampaignPreviewService,
} from './campaign-preview.service';
import { ActivatedRoute } from '@angular/router';
import { AddCandidateModalComponent } from '../modals';
import { filter, mergeMap } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Web3AccountService } from 'ng-web3';

@Component({
  selector: 'voting-dapp-campaign-preview',
  templateUrl: './campaign-preview.component.html',
  styleUrls: ['./campaign-preview.component.scss'],
})
export class CampaignPreviewComponent {
  campaignModel?: CampaignModel;

  constructor(
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _dialog: MatDialog,
    private readonly _snackBar: MatSnackBar,
    private readonly _web3AccountService: Web3AccountService,
    private readonly _campaignPreviewService: CampaignPreviewService
  ) {
    _campaignPreviewService.initializeContract(
      _activatedRoute.snapshot.paramMap.get('id') || ''
    );
    _campaignPreviewService.getCampaign$()
      .subscribe((campaignModel: CampaignModel) => {
        this.campaignModel = campaignModel;
      });

    _campaignPreviewService.candidateCreated$()
      .subscribe(candidate => {
        this.campaignModel.candidates.push(candidate);
      });
  }

  onAddCandidateClicked(): void {
    this._dialog
      .open(AddCandidateModalComponent, {width: '250px'})
      .afterClosed()
      .pipe(
        filter((candidateName: string) => !!candidateName),
        mergeMap((candidateName: string) =>
          this._web3AccountService.connectedAccount$.pipe(
            mergeMap((connectedAccount: string) =>
              this._campaignPreviewService.addCandidate$(candidateName, {
                from: connectedAccount,
              })
            )
          )
        )
      )
      .subscribe(() => {
        this._snackBar.open('Candidate successfully added.', 'Ok');
      });
  }

  onVoteClicked() {
    // TODO: Implement logic of vote click.
    // TODO: Remember to disable other buttons when voting in progress.
  }
}
