const CampaignFactory = artifacts.require('CampaignFactory');

module.exports = (deployer) => {
  deployer.deploy(CampaignFactory);
};
