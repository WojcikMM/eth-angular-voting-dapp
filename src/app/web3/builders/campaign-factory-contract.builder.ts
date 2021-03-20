import {BaseContractBuilder} from './base-contract.builder';
import campaignFactoryAbi from '../abi-files/campaign-factory.abi.json';

export class CampaignFactoryContractBuilder extends BaseContractBuilder {
  constructor() {
    super(campaignFactoryAbi);
  }
}
