const fs = require('fs');

const abiFiles = [
  { input: 'Campaign', output: 'campaign.abi' },
  { input: 'CampaignFactory', output: 'campaign-factory.abi' },
];
const inputPath = './build/contracts/';
const outputPath = './apps/voting-dapp/src/app/web3/abi-files/';
const contractFileExtension = 'json';

function execute(contract) {
  const fileContent = fs.readFileSync(
    `${inputPath}${contract.input}.${contractFileExtension}`,
    { encoding: 'utf-8' }
  );
  if (!fileContent) {
    throw new Error(`Cannot find file with ${contract.input} contract abi.`);
  }

  const json = JSON.parse(fileContent.toString());

  if (!json.hasOwnProperty('abi')) {
    throw new Error(
      `Cannot find abi property in file ${contract.input} content.`
    );
  }

  fs.writeFileSync(
    `${outputPath}${contract.output}.${contractFileExtension}`,
    JSON.stringify(json.abi, null, 2),
    {
      encoding: 'utf-8',
      flag: 'w',
    }
  );

  console.log(`Contract: ${contract.output} updated successfully.`);
}

abiFiles.forEach((contractName) => {
  execute(contractName);
});
