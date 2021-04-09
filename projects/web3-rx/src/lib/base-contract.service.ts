import { fromPromise } from 'rxjs/internal-compatibility';
import { Contract, SendOptions, EventData } from 'web3-eth-contract';
import { Observable } from 'rxjs';

// TODO: start using "from" instead of "fromPromise"
/**
 * TODO: ADD DOCS HERE
 */
export class BaseContractService {

  constructor(private _contract?: Contract) {
  }

  /**
   * Use this method when you cannot pass contract object through constructor
   * @param contract - contract object
   * @protected
   */
  protected __initializeContract(contract: Contract): void {
    this._contract = contract;
  }

  /**
   * Use this method to get data from "Smart Contract".
   * @param methodName - name of ABI Smart Contract method with parameters (ex. sampleSmartContractMethodName(string, uint) )
   * @param params - parameters for Smart Contract method
   * @protected
   * @example
   * export class SampleSmartContractService extends BaseMethodCaller {
   *   constructor(){
   *     const contract = new CampaignFactoryContractBuilder()
   *       .withAddress(environment.campaignFactory.address)
   *       .withOptions(environment.campaignFactory.options)
   *       .build();
   *     super(contract);
   *   }
   *
   *   getMySmartContractData$(sampleParam1: string, samplePram2: number): Observable<SampleModel> {
   *     return this.__getData$<SampleModel>('sampleSmartContractMethodName(string, uint)', sampleParam1, sampleParam2);
   *   }
   *
   * }
   */
  protected __getData$<T>(methodName: string, ...params: unknown[]): Observable<T> {
    return this._checkContractMethod(methodName) && fromPromise<T>(this._contract?.methods[methodName](...params).call());
  }

  /**
   * Use this method to post changes into "Smart Contract".
   * @param methodName - name of ABI Smart Contract method with parameters (ex. sampleSmartContractMethodName(string, uint) )
   * @param sendOptions - options for given transaction (i.e. client account called "from" )
   * @param params - parameters for Smart Contract method
   * @protected
   * @description - Hint: To get data from transaction use Smart Contract Events.
   * @example
   * export class SampleSmartContractService extends BaseMethodCaller {
   *   constructor(){
   *     const contract = new CampaignFactoryContractBuilder()
   *       .withAddress(environment.campaignFactory.address)
   *       .withOptions(environment.campaignFactory.options)
   *       .build();
   *     super(contract);
   *   }
   *
   *   getMySmartContractData(clientAccountAddress: string, sampleParam1: string, samplePram2: number): Observable<void> {
   *    const options: SendOptions = {
   *      from: clientAccountAddress
   *    };
   *     return this.__sendData$<SampleModel>('sampleSmartContractMethodName(string, uint)', options, sampleParam1, sampleParam2);
   *   }
   *
   * }
   */
  protected __sendData$(methodName: string, sendOptions: SendOptions, ...params: unknown[]): Observable<void> {
    return this._checkContractMethod(methodName) && fromPromise<void>(this._contract?.methods[methodName](...params).send(sendOptions));
  }

  /**
   * Use this method to subscribe to Smart Contract Events
   * @param eventName - name of your event
   * @description This method returns base event values to get typed one please use <i>__getEvents$</i> method
   * @protected
   */
  protected __getBaseEvents$<T>(eventName: string): Observable<{ [p: string]: unknown }> {
    return this.__getEvents$(eventName, x => x);
  }

  /**
   * Use this method to subscribe to Smart Contract Events
   * @param eventName - name of your event
   * @param mapFunc - function to map event to given type
   * @protected
   */
  protected __getEvents$<T>(eventName: string, mapFunc: (eventValues: { [p: string]: unknown }) => T): Observable<T> {
    this._checkContractEvent(eventName);
    if (!mapFunc) {
      throw new Error('You must precise map function for this handler');
    }

    return new Observable<T>((observer) => {
      this._contract?.events[eventName]({}, (err: Error, result: EventData) => {
        if (!!err) {
          observer.error(err);
        } else {
          observer.next(mapFunc(result.returnValues));
        }
      });
    });
  }

  private _checkContractMethod = (methodName: string) => this._checkContract('method', methodName);
  private _checkContractEvent = (eventName: string) => this._checkContract('event', eventName);

  private _checkContract(checkType: 'event' | 'method', methodOrEventName: string): true {
    if (!this._contract) {
      throw new Error('Contract not initialized. Please call __initialize method first.');
    }

    if (!methodOrEventName) {
      throw new Error(`You must specified not empty ${checkType} name.`);
    }

    if (
      (checkType === 'method' && !this._contract.methods[methodOrEventName]) ||
      (checkType === 'event' && !this._contract.events[methodOrEventName])
    ) {
      throw new Error(`There is no ${checkType} with given name at given ABI file`);
    }

    return true;
  }
}
