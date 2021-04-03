import { provider } from 'web3-core/types';
import Web3 from 'web3';

// TODO: Provide full interface for handle webSocket on() methods and handle if it is not exists
export interface Web3Window extends Window {
  ethereum: provider;
}

export declare let window: Web3Window;
export const web3 = new Web3(window.ethereum);

