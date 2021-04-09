import { Injectable } from '@angular/core';
import { BaseContractBuilder } from 'web3-rx';
import campaignAbi from '../abi-files/campaign.abi.json';

@Injectable({
  providedIn: 'root'
})
export class CampaignContractBuilder extends BaseContractBuilder {
  constructor() {
    super(campaignAbi);
  }
}
