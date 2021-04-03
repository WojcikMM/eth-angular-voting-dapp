import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Web3AccountServiceProvider } from '../services/web3.account.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private readonly _accountService: Web3AccountServiceProvider,
              private readonly _router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return this._accountService.connectedAccount$
      .pipe(
        map(account => {
          if (!account) {
            return this._router.createUrlTree(['login']);
          }
          return true;
        })
      );
  }

}
