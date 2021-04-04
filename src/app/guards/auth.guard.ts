import { Injectable } from '@angular/core';
import { CanActivate, UrlTree, Router } from '@angular/router';
import { Web3AccountServiceProvider } from '../services/web3.account.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private readonly _accountService: Web3AccountServiceProvider,
              private readonly _router: Router) {
  }

  canActivate(): boolean | UrlTree {
    return !!this._accountService.connectedAccountSnapshot || this._router.createUrlTree(['login']);
  }

}
