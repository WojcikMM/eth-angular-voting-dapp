import { Injectable } from '@angular/core';
import { CanActivate, UrlTree, Router } from '@angular/router';
import { Web3AccountService } from 'ng-web3';
import { Observable } from 'rxjs';
import { map, timeout } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private readonly _accountService: Web3AccountService,
              private readonly _router: Router) {
  }

  canActivate(): Observable<boolean | UrlTree> {
    return this._accountService.connectedAccount$.pipe(
      timeout(2000),
      map((isConnected: string) => {
        return !!isConnected || this._router.createUrlTree(['login']);
      })
    );
  }

}
