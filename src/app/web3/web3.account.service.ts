import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {web3, windowEthereum} from './web3';

@Injectable({
  providedIn: 'root'
})
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

    windowEthereum.on('accountsChanged', (accounts: string[]) => {
      this._accountChangedHandler(accounts);
    });
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
