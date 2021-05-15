import { Contract, ContractOptions } from 'web3-eth-contract';
import { AbiItem } from 'web3-utils';
import { web3 } from './web3';

/**
 * This is base builder class for create Ethereum Smart Contract adapter builder.
 * @description This class follow "Builder" Design Pattern.
 * For use it please just create class extending this one and provide constructor parameters.
 * @param abiDefinition - json based definition of your smart contract class.
 * @param options - default options for your connection with smart contract ( can be overridden with each transaction)
 */
export abstract class BaseContractBuilder {
  private _address?: string;

  protected constructor(
    protected readonly abiDefinition: AbiItem[] | unknown,
    protected options?: ContractOptions
  ) {
    if (!abiDefinition || (abiDefinition as AbiItem[])?.length === 0) {
      throw new Error('Abi definition must be specified.');
    }
  }

  /**
   * Provide address of your Smart Contract instance.
   * @description Warning ! Provided not deployed contract address can makes bug in your application.
   * @param contractAddress - hash id of your deployed Smart Contract instance.
   */
  withAddress(contractAddress: string): this {
    if (!contractAddress) {
      throw new Error('Address cannot be empty');
    }
    this._address = contractAddress;
    return this;
  }

  /**
   * Provide default options for Smart Contract transactions.
   * @param options - options for smart contract transactions. Can be overridden in each transaction.
   */
  withOptions(options: ContractOptions): this {
    this.options = options;
    return this;
  }

  /**
   * Build method create instance of smart contract adapter.
   */
  build(): Contract {
    if (!this._address) {
      throw new Error('Address cannot be empty');
    }
    return new web3.eth.Contract(
      this.abiDefinition as AbiItem[],
      this._address,
      this.options
    );
  }
}
