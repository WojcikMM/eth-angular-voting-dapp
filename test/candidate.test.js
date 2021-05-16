const Candidate = artifacts.require('./Candidate');
const truffleAssert = require('truffle-assertions');

let contractInstance;
const expectedCandidateName = 'Super Sample CandidateName';

contract('Candidate', () => {
  beforeEach(async () => {
    contractInstance = await Candidate.new(expectedCandidateName);
  });

  describe('vote()', () => {
    it('should increment voteCount', async () => {
      // Arrange
      // Act
      const beforeResult = await contractInstance.getVoteCount();
      await contractInstance.vote();
      const afterResult = await contractInstance.getVoteCount();
      expect(beforeResult.toNumber()).to.below(afterResult.toNumber());
    });

    it('should emit event "CandidateVoted"', async () => {
      // Arrange
      const expectedEventName = 'CandidateVoted';
      // Act
      const result = await contractInstance.vote();
      // Assert
      truffleAssert.eventEmitted(result, expectedEventName);
    });

    it('should emit event "CandidateVoted" with candidate address', async () => {
      // Arrange
      const expectedEventName = 'CandidateVoted';
      // Act
      const result = await contractInstance.vote();
      // Assert
      truffleAssert.eventEmitted(result,expectedEventName, (ev) => {
        expect(ev.candidateAddress).to.equal(contractInstance.address);
        return true;
      });

    })
  });

  describe('getName()', () => {
    it('should return expected name', async () => {
      // Arrange
      const expectedName = expectedCandidateName;

      // Act
      const name = await contractInstance.getName();

      // Assert
      expect(name).to.equal(expectedName);
    });
  });

  describe('getVoteCount()', () => {
    it('should return zero after create instance', async () => {
      // Arrange
      const expectedVoteCount = 0;
      // Act
      const result = await contractInstance.getVoteCount();

      // Assert
      expect(result.toNumber()).to.equal(expectedVoteCount);
    });

    it('should return one after one vote call', async () => {
      // Arrange
      const expectedVoteCount = 1;
      // Act
      await contractInstance.vote();
      const result = await contractInstance.getVoteCount();
      // Assert
      expect(result.toNumber()).to.equal(expectedVoteCount);
    });
  });
});
