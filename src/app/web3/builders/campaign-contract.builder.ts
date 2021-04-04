import { Injectable } from '@angular/core';
import { BaseContractBuilder } from 'web3-rx';
import campaignFactoryAbi from '../abi-files/campaign-factory.abi.json';

@Injectable({
  providedIn: 'root'
})
export class CampaignContractBuilder extends BaseContractBuilder {
  constructor() {
    super(campaignFactoryAbi);
  }
}
