import {BaseContractBuilder} from './base-contract.builder';
import campaignFactoryAbi from '../abi-files/campaign-factory.abi.json';

export class CampaignContractBuilder extends BaseContractBuilder {
  constructor() {
    super(campaignFactoryAbi);
  }
}
