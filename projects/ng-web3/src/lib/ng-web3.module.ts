import { ModuleWithProviders, NgModule } from '@angular/core';
import { Web3AccountService } from './web3.account.service';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: []
})
export class NgWeb3Module {
  static forRoot(): ModuleWithProviders<NgWeb3Module> {
    return {
      ngModule: NgWeb3Module,
      providers: [
        Web3AccountService
      ]
    };
  }
}
