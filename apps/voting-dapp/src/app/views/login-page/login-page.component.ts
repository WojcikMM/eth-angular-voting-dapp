import { Component } from '@angular/core';
import { filter } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Web3AccountService } from 'ng-web3';

@Component({
  selector: 'voting-dapp-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent {
  constructor(
    private readonly _accountService: Web3AccountService,
    private readonly _router: Router
  ) {
    this._accountService.connectedAccount$
      .pipe(filter((account) => !!account))
      .subscribe(() => {
        this._router.navigate(['/']);
      });
  }

  onConnectClicked(): void {
    this._accountService.requestLogin();
  }
}
