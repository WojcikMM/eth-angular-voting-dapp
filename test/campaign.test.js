const Campaign = artifacts.require('./Campaign');

let contractInstance;

contract('Candidate', () => {
  beforeEach(async () => {
    contractInstance = await Campaign.new();
  });
});
