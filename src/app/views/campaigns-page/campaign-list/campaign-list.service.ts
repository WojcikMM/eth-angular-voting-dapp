import { Injectable } from '@angular/core';
import { CampaignFactoryContractBuilder } from '../../../web3';
import { environment } from '../../../../environments/environment';
import { Contract } from 'web3-eth-contract';
import { fromPromise } from 'rxjs/internal-compatibility';
import { Observable, zip } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';


interface GetCampaignsDto {
  addressesArray: string[];
  voteCountsArray: bigint[];
  hasCandidatesArray: boolean[];
  canVoteArray: boolean[];
  isActiveArray: boolean[];
  isUserOwnerArray: boolean[];
}


@Injectable({
  providedIn: 'root'
})
export class CampaignListService {

  private readonly _campaignFactoryContract: Contract;

  constructor() {
    this._campaignFactoryContract = new CampaignFactoryContractBuilder()
      .withAddress(environment.campaignFactory.address)
      .withOptions(environment.campaignFactory.options)
      .build();
  }

  getCampaignsList$(): Observable<CampaignListItem[]> {
    return fromPromise<GetCampaignsDto>(this._campaignFactoryContract.methods.getCampaigns().call())
      .pipe(
        mergeMap((getCampaignsDtoResult =>
              zip(getCampaignsDtoResult.addressesArray
                .map((address: string, index: number) =>
                  this._getCampaignName(address)
                    .pipe(
                      map(name => this._mapGetCampaignResultToCampaignListItem(getCampaignsDtoResult, index, name))
                    )
                )
              )
          )
        )
      );
  }

  private _getCampaignName(campaignAddress: string): Observable<string> {
    return fromPromise<string>(this._campaignFactoryContract.methods.getCampaignName(campaignAddress).call());
  }

  private _mapGetCampaignResultToCampaignListItem(getCampaignDto: GetCampaignsDto, index: number, campaignName: string): CampaignListItem {
    return {
      address: getCampaignDto.addressesArray[index],
      name: campaignName,
      votesCount: getCampaignDto.voteCountsArray[index],
      hasCandidates: getCampaignDto.hasCandidatesArray[index],
      canUserVote: getCampaignDto.canVoteArray[index],
      isActive: getCampaignDto.isActiveArray[index],
      isUserOwner: getCampaignDto.isUserOwnerArray[index]
    } as CampaignListItem;
  }
}


export interface CampaignListItem {
  address: string;
  name: string;
  votesCount: bigint;
  hasCandidates: boolean;
  canUserVote: boolean;
  isActive: boolean;
  isUserOwner: boolean;
}
