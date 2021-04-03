import { Injectable } from '@angular/core';
import { BaseContractService } from 'web3-rx';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { CampaignFactoryContractBuilder } from '../../../web3';

interface GetCampaignDto {
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

  constructor() {
    const contract = new CampaignFactoryContractBuilder()
      .withAddress(environment.campaignFactory.address)
      .withOptions(environment.campaignFactory.options)
      .build();
    super(contract);
  }

  getCampaignsList$(): Observable<CampaignListItem[]> {
    return this.__getData$<GetCampaignDto>('getCampaigns()')
      .pipe(
        map((result: GetCampaignDto) => {

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
    return this.__getData$('getCampaignName(string)', campaignAddress);
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
