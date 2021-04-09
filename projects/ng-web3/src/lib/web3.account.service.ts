import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { web3 } from './web3';

@Injectable()
export class Web3AccountService {

  readonly connectedAccount$: Observable<string>;

  private readonly _accountChanged: BehaviorSubject<string>;

  constructor() {
    this._accountChanged = new BehaviorSubject<string>('');
    this.connectedAccount$ = this._accountChanged.asObservable();

    web3.eth.getAccounts()
      .then(accounts => {
        this._accountChangedHandler(accounts);
      });

    ((window as any).ethereum as any).on('accountsChanged', (accounts: string[]) => {
      this._accountChangedHandler(accounts);
    });
  }

  get connectedAccountSnapshot(): string {
    return this._accountChanged.value;
  }

  requestLogin(): void {
    web3.eth.requestAccounts()
      .then(accounts => {
        this._accountChangedHandler(accounts);
      })
      .catch(() => {
        this._accountChanged.next('');
      });
  }

  private _accountChangedHandler(accounts: string[]): void {
    const account = accounts.length !== 1 ? '' : accounts[0];
    this._accountChanged.next(account);
  }


}
