import { Injectable } from '@angular/core';
import { BaseContractService } from 'ng-web3';
import { CampaignContractBuilder } from '../../../web3';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface GetCampaignDto {
  _name: string;
  _voteCount: bigint;
  _userCanVote: boolean;
  _candidatesAddresses: string[];
  _isActive: boolean;
  _userIsOwner: boolean;
}

export interface CampaignModel {
  name: string;
  voteCount: bigint;
  userCanVote: boolean;
  candidates: CandidateModel[];
  isActive: boolean;
  userIsOwner: boolean;
}

export interface CandidateModel {
  address: string;
  name$: Observable<string>;
}

@Injectable({
  providedIn: 'root'
})
export class CampaignPreviewService extends BaseContractService {

  constructor(private readonly _campaignContractBuilder: CampaignContractBuilder) {
    super();
  }

  initializeContract(contractAddress: string): void {
    const contract = this._campaignContractBuilder
      .withAddress(contractAddress)
      .build();

    this.__initializeContract(contract);
  }

  getCampaign$(): Observable<CampaignModel> {
    return this.__getData$<GetCampaignDto>('getCampaignInfo()').pipe(
      map((getCampaignDto: GetCampaignDto) => this._mapCampaignDtoToModel(getCampaignDto))
    );
  }

  private _getCandidateName(candidateAddress: string): Observable<string> {
    return this.__getData$<string>('getCandidateNameById(address)', candidateAddress);
  }

  private _mapCampaignDtoToModel(campaignDto: GetCampaignDto): CampaignModel {
    return {
      name: campaignDto._name,
      userCanVote: campaignDto._userCanVote,
      voteCount: campaignDto._voteCount,
      userIsOwner: campaignDto._userIsOwner,
      isActive: campaignDto._isActive,
      candidates: campaignDto._candidatesAddresses.map(candidateAddress => ({
        address: candidateAddress,
        name$: this._getCandidateName(candidateAddress)
      }))
    };
  }
}
