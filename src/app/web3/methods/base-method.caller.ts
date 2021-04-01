import { fromPromise } from 'rxjs/internal-compatibility';
import { Contract, SendOptions, EventData } from 'web3-eth-contract';
import { Observable } from 'rxjs';

export class BaseMethodCaller {
  constructor(private readonly contract: Contract) {
  }

  protected __getData$<T>(methodName: string, ...params: any[]): Observable<T> {
    if (!this.contract.methods[methodName]) {
      throw new Error('There is no method with given name at given ABI file');
    }
    return fromPromise<T>(this.contract.methods[methodName](...params).call());
  }

  protected __sendData$(accountAddress: string, methodName: string, sendOptions: SendOptions, ...params: any[]): Observable<void> {
    if (!this.contract.methods[methodName]) {
      throw new Error('There is no method with given name at given ABI file');
    }
    return fromPromise<void>(this.contract.methods[methodName](...params).send(sendOptions));
  }

  protected __subscribeEventMapped$<T>(eventName: string, mapFunc: (eventValues: { [p: string]: any }) => T): Observable<T> {
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
