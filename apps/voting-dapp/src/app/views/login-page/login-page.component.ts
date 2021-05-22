import { Component } from '@angular/core';
import { Web3AccountService } from 'ng-web3';

@Component({
  selector: 'voting-dapp-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent {

  constructor(private readonly _accountService: Web3AccountService) {
  }

  onConnectClicked(): void {
    this._accountService.requestLogin();
  }
}
