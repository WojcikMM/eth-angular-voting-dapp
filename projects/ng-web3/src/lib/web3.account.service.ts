import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { web3 } from './web3';

/**
 * This service handling wallet interactions. Like subscribe actual connected account or request for account connection.
 */
@Injectable()
export class Web3AccountService {

  /**
   * Observable stream of connected accounts
   */
  readonly connectedAccount$: Observable<string>;

  private readonly _accountChanged: Subject<string>;
  private _lastConnectedAccount = '';

  constructor() {
    this._accountChanged = new Subject<string>();
    this.connectedAccount$ = this._accountChanged.asObservable();

    web3.eth.getAccounts()
      .then(accounts => {
        this._accountChangedHandler(accounts);
      });

    ((window as any).ethereum as any).on('accountsChanged', (accounts: string[]) => {
      this._accountChangedHandler(accounts);
    });
  }

  /**
   * This is just snapshot of actual connected account.
   * @link connectedAccount$ - use this for observable stream
   */
  get connectedAccountSnapshot(): string {
    return this._lastConnectedAccount;
  }

  /**
   * This method push your wallet plugin to connect with some account.
   */
  requestLogin(): void {
    web3.eth.requestAccounts()
      .then(accounts => {
        this._accountChangedHandler(accounts);
      })
      .catch(() => {
        this._lastConnectedAccount = '';
        this._accountChanged.next('');
      });
  }

  private _accountChangedHandler(accounts: string[]): void {
    const account = accounts.length !== 1 ? '' : accounts[0];
    this._lastConnectedAccount = account;
    this._accountChanged.next(account);
  }


}
