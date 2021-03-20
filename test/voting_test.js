/* eslint-disable no-undef */
const Voting = artifacts.require('./Voting');
const truffleAssert = require('truffle-assertions');

let contractInstance;
contract('Voting', () => {

    beforeEach(async () => {
        contractInstance = await Voting.new();
    });

    describe('after initialize', () => {

        it('should be initialized with empty campaigns array', async () => {
            let campaignCounter = await contractInstance.getCampaignCount();

            expect(campaignCounter.toNumber()).to.equal(0);
        });

        it('should throw error when try to get not existed campaign-preview name', async () => {
            let throwsError = false;
            await contractInstance.getCampaignNameByIndex(3)
                .catch(() => {
                    throwsError = true;
                });
            expect(throwsError).to.equal(true);
        });

        it('should getCandidatesCountByCampaignId throw exception when campaign-preview id not exists', async () => {
            let throwsError = false;
            await contractInstance.getCandidatesCountByCampaignId(0).catch(() => { throwsError = true });

            expect(throwsError).to.equal(true);
        });

        it('should addCandidateToCampaign throw exception when campaign-preview index not exists', async () => {
            let throwsError = false;
            await contractInstance.addCandidateToCampaign(0, 'sample').catch(() => { throwsError = true });

            expect(throwsError).to.equal(true);
        });
    });

    describe('when method addCampaign is called', () => {
        it('should increase campaignsCounter to 1', async () => {
            const expectedCampaignName = 'sample';

            await contractInstance.addCampaign(expectedCampaignName);
            const campaignCounter = await contractInstance.getCampaignCount();
            expect(campaignCounter.toNumber()).to.equal(1);
        });

        it('should getCampaignNameByIndex return expected campaign-preview name', async () => {
            const expectedCampaignName = 'sample';

            await contractInstance.addCampaign(expectedCampaignName);
            const resultCampaignName = await contractInstance.getCampaignNameByIndex(0);
            expect(resultCampaignName).to.equal(expectedCampaignName);
        });

        it('should emit CampaignCreatedEvent when method succeed', async () => {
            const exampleCampaignName = 'campaign-preview';

            const result = await contractInstance.addCampaign(exampleCampaignName);

            truffleAssert.eventEmitted(result, 'CampaignCreatedEvent');
        });

        it('should emit CampaignCreatedEvent with correct parameters when method succeed', async () => {
            const exampleCampaignName = 'campaign-preview';
            const expectedCampaignIndex = 0;

            const result = await contractInstance.addCampaign(exampleCampaignName);

            truffleAssert.eventEmitted(result, 'CampaignCreatedEvent', (ev) => {
                expect(ev.name).to.equal(exampleCampaignName);
                expect(ev.campaignIndex.toNumber()).to.equal(expectedCampaignIndex);
                return true;
            });
        });

        describe('should be able to register campaign-preview with name contains ...', () => {
            const execute = (expectedCampaignName) => {
                return contractInstance.addCampaign(expectedCampaignName)
                    .then(() => contractInstance.getCampaignCount())
                    .then(campaignCounter => {
                        expect(campaignCounter.toNumber()).to.equal(1);
                    });
            }

            it('space in name', async () => {
                await execute('sample campaign-preview name');
            });

            it('capitalized name', async () => {
                await execute('Sample Campaign Name')
            });

            it('UPPERCASE name', async () => {
                await execute('SAMPLE CAMPAIGN NAME');
            });

            it('Special characters in name', () => {
                execute('$upp3r Ultr@ (@mp@!gn');
            });
        });

    });


    describe('when one campaign-preview is created with no candidates', () => {
        const GIVEN_CAMPAIGN_INDEX = 0;
        beforeEach(async () => {
            await contractInstance.addCampaign('Example Campaign');
        });

        it('getCandidatesCountByCampaignId should return 0', async () => {
            const resultCount = await contractInstance.getCandidatesCountByCampaignId(GIVEN_CAMPAIGN_INDEX);
            expect(resultCount).to.equal(resultCount);
        });

    });
});
