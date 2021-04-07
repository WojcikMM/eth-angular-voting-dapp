import { Injectable } from '@angular/core';
import { BaseContractService } from 'web3-rx';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { CampaignFactoryContractBuilder } from '../../../web3';
import { Web3AccountServiceProvider } from 'src/app/services/web3.account.service';

interface GetCampaignsListDto {
  _addressesArray: string[];
  _voteCountsArray: bigint[];
  _hasCandidatesArray: boolean[];
  _canVoteArray: boolean[];
  _isActiveArray: boolean[];
  _isUserOwnerArray: boolean[];
}

@Injectable({
  providedIn: 'root'
})
export class CampaignListService extends BaseContractService {

  constructor(private readonly web3AccountServiceProvider: Web3AccountServiceProvider,
              campaignFactoryContractBuilder: CampaignFactoryContractBuilder) {
    super(campaignFactoryContractBuilder.build());
  }

  campaignCreatedEvent$(): Observable<CampaignListItem> {
    return this.__getEvents$('CampaignCreated', eventValues => {
      const campaignAddress = eventValues[0] as string;
      const campaignName = eventValues[1] as string;
      return {
        address: campaignAddress,
        name$: of(campaignName),
        votesCount: BigInt(0),
        isUserOwner: true,
        isActive: true,
        canUserVote: true,
        hasCandidates: false
      } as CampaignListItem;
    });
  }

  createCampaign$(campaignName: string): Observable<void> {
    const account = this.web3AccountServiceProvider.connectedAccountSnapshot;
    return this.__sendData$('createCampaign(string)', {from: account}, campaignName);
  }

  getCampaignsList$(): Observable<CampaignListItem[]> {
    return this.__getData$<GetCampaignsListDto>('getCampaigns()')
      .pipe(
        map((result: GetCampaignsListDto) => {

          return result._addressesArray.map((address, index) => ({
            address,
            name$: this._getCampaignName(address),
            votesCount: result._voteCountsArray[index],
            hasCandidates: result._hasCandidatesArray[index],
            canUserVote: result._canVoteArray[index],
            isActive: result._isActiveArray[index],
            isUserOwner: result._isUserOwnerArray[index]
          } as CampaignListItem));
        })
      );
  }

  private _getCampaignName(campaignAddress: string): Observable<string> {
    return this.__getData$('getCampaignName(address)', campaignAddress);
  }
}

export interface CampaignListItem {
  address: string;
  name$: Observable<string>;
  votesCount: bigint;
  hasCandidates: boolean;
  canUserVote: boolean;
  isActive: boolean;
  isUserOwner: boolean;
}
