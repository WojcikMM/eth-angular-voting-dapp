import {BaseContractBuilder} from 'web3-rx';
import campaignFactoryAbi from '../abi-files/campaign-factory.abi.json';

export class CampaignFactoryContractBuilder extends BaseContractBuilder {
  constructor() {
    super(campaignFactoryAbi);
  }
}
