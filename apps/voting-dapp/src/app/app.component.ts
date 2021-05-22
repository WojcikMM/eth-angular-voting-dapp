import { Component, NgZone } from '@angular/core';
import { Web3AccountService } from "ng-web3";
import { distinctUntilChanged } from "rxjs/operators";
import { Router } from "@angular/router";

@Component({
  selector: 'voting-dapp-root',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent {

  constructor(private readonly _accountService: Web3AccountService,
              private readonly _router: Router,
              private readonly ngZone: NgZone) {
    this._accountService.connectedAccount$
      .pipe(distinctUntilChanged())
      .subscribe((connectedAccount) => {
        ngZone.run(() => {
          connectedAccount ?
            this._router.navigate(['/campaign/list']) :
            this._router.navigate(['/login']);
        });
      });
  }


}
