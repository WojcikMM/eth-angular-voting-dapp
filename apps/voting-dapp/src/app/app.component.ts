import { Component, NgZone } from '@angular/core';
import { Web3AccountService } from "ng-web3";
import { distinctUntilChanged } from "rxjs/operators";
import { ActivatedRoute, Router } from "@angular/router";
import { ROUTES_CONST } from "./routes.const";

@Component({
  selector: 'voting-dapp-root',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent {

  constructor(private readonly _accountService: Web3AccountService,
              private readonly _router: Router,
              private readonly _activatedRoute: ActivatedRoute,
              private readonly ngZone: NgZone) {
    this._accountService.connectedAccount$
      .pipe(distinctUntilChanged())
      .subscribe((connectedAccount) => {
        ngZone.run(() => {
          if (!connectedAccount) {
            this._router.navigateByUrl(`/${ROUTES_CONST.LOGIN}`)
          } else if (this._activatedRoute.firstChild?.snapshot.url.some(x => x.path === ROUTES_CONST.LOGIN)) {
            this._router.navigateByUrl(`/${ROUTES_CONST.CAMPAIGNS_LIST}`);
          }
        });
      });
  }


}
