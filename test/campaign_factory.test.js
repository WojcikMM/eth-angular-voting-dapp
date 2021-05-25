const CampaignFactory = artifacts.require('./CampaignFactory');

let contractInstance;

contract('CampaignFactory', () => {
  beforeEach(async () => {
    contractInstance = await CampaignFactory.new();
  });

  describe('getCampaignName()', () => {
    it('should throw error when called with wrong address', async () => {
      // arrange
      const wrongCampaignContractAddress = '';

      // act & assert
      expect(async () => await contractInstance.getCampaignName(wrongCampaignContractAddress)).toThrowError();
    });
  })
});
