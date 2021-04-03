import {BaseContractBuilder} from 'web3-rx';
import campaignFactoryAbi from '../abi-files/campaign-factory.abi.json';

export class CampaignContractBuilder extends BaseContractBuilder {
  constructor() {
    super(campaignFactoryAbi);
  }
}
