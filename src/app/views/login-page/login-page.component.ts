import {Component, OnInit} from '@angular/core';
import {Web3AccountService} from '../../web3/web3.account.service';
import {filter} from 'rxjs/operators';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  constructor(private readonly _accountService: Web3AccountService,
              private readonly _router: Router) {
    this._accountService.connectedAccount$
      .pipe(
        filter(account => !!account)
      )
      .subscribe(loggedInAccount => {
        console.log('xx', loggedInAccount);
        this._router.navigate(['/']);
      });
  }

  ngOnInit(): void {

  }

  onConnectClicked(): void {
    this._accountService.requestLogin();
  }
}
