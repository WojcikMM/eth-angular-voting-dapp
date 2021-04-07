import { Injectable } from '@angular/core';
import { BaseContractService } from 'web3-rx';
import { ActivatedRoute } from '@angular/router';
import { CampaignContractBuilder } from '../../../web3';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface GetCampaignDto {
  _name: string;
  // TODO: fill out this interface
}

export interface CampaignModel {
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class CampaignPreviewService extends BaseContractService {

  constructor(private readonly activateRoute: ActivatedRoute,
              campaignContractBuilder: CampaignContractBuilder) {
    super(campaignContractBuilder
      .withAddress(activateRoute.snapshot.paramMap.get('id') || '')
      .build());
  }

  getCampaign$(): Observable<CampaignModel> {
    return this.__getData$<GetCampaignDto>('getCampaignInfo()').pipe(
      map((getCampaignDto: GetCampaignDto) => ({
        name: getCampaignDto._name,
        // TODO: fill this out
      } as CampaignModel))
    );
  }
}
