const CampaignFactory = artifacts.require('./CampaignFactory');

let contractInstance;

contract('Candidate', () => {
  beforeEach(async () => {
    contractInstance = await CampaignFactory.new();
  });
});
