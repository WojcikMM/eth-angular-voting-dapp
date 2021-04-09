import { BaseContractBuilder } from 'ng-web3';
import campaignFactoryAbi from '../abi-files/campaign-factory.abi.json';
import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CampaignFactoryContractBuilder extends BaseContractBuilder {
  constructor() {
    super(campaignFactoryAbi);
    this.withAddress(environment.campaignFactory.address);
    this.withOptions(environment.campaignFactory.options);
  }
}
