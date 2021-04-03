import { Component } from '@angular/core';
import { filter } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Web3AccountServiceProvider } from 'src/app/services/web3.account.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {

  constructor(private readonly _accountService: Web3AccountServiceProvider,
              private readonly _router: Router) {
    this._accountService.connectedAccount$
      .pipe(
        filter(account => !!account)
      )
      .subscribe(() => {
        this._router.navigate(['/']);
      });
  }

  onConnectClicked(): void {
    this._accountService.requestLogin();
  }
}
