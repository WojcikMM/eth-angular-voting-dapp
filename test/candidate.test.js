const Candidate = artifacts.require('./Candidate');

let contractInstance;
const expectedCandidateName = 'Super Sample CandidateName';

contract('Candidate', () => {
  beforeEach(async () => {
    contractInstance = await Candidate.new(expectedCandidateName);
  });

  describe('getName()', () => {
    it('should return expected name', async () => {
      // Arrange
      const expectedName = expectedCandidateName;

      // Act
      const name = await contractInstance.getName();
      console.log(name);

      // Assert
      expect(name).to.equal(expectedName);
    });
  });
});
