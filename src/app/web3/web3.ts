import Web3 from 'web3';

// @ts-ignore
export const windowEthereum = window.ethereum;
export const web3 = new Web3(windowEthereum);
