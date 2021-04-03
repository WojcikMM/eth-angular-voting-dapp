import { fromPromise } from 'rxjs/internal-compatibility';
import { Contract, SendOptions, EventData } from 'web3-eth-contract';
import { Observable } from 'rxjs';

// TODO: start using "from" instead of "fromPromise"
/**
 * TODO: ADD DOCS HERE
 */
export class BaseContractService {

  constructor(private readonly contract: Contract) {
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
    if (!this.contract.methods[methodName]) {
      throw new Error('There is no method with given name at given ABI file');
    }
    return fromPromise<T>(this.contract.methods[methodName](...params).call());
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
    if (!this.contract.methods[methodName]) {
      throw new Error('There is no method with given name at given ABI file');
    }
    return fromPromise<void>(this.contract.methods[methodName](...params).send(sendOptions));
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
    if (!this.contract.events[eventName]) {
      throw new Error('There is no event with given name at given ABI file');
    }
    if (!mapFunc) {
      throw new Error('You must precise map function for this handler');
    }

    return new Observable<T>((observer) => {
      this.contract.events[eventName]({}, (err: Error, result: EventData) => {
        if (!!err) {
          observer.error(err);
        } else {
          observer.next(mapFunc(result.returnValues));
        }
      });
    });
  }
}
