# NgWeb3

This is package help to work with Ethereum Smart Contract in reactive way.

## For now package contains:

### NgWeb3Module:

One main module for import at your main app module.  
Just place `NgWeb3Module.forRoot()` in your imports.

### Services:

The heart of this package.  
Lightweight services to communicate with Smart Contracts by clear API (without promises and callbacks).

#### Web3AccountService:

Service for handling wallet interactions.

##### Example usage:

Usage in auth guard

```typescript
@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private readonly _accountService: Web3AccountService,
    private readonly _router: Router
  ) {}

  canActivate(): boolean | UrlTree {
    return (
      !!this._accountService.connectedAccountSnapshot ||
      this._router.createUrlTree(['login'])
    );
  }
}
```

Usage in login component

```typescript
@Component({
  selector: 'app-login-page',
  template: `<button (click)="onConnectClicked()">Login</button>`,
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
```

#### BaseContractBuilder

This is base builder class for create Ethereum Smart Contract adapter builder.
_This class follow "Builder" Design Pattern._

**WARNING**  
When you need to use json imports you need to turn on tsconfig `"resolveJsonModule": true`.

##### Example usage:

One/main contract to interaction:

```typescript
import { campaignAbi } from '../abi-files/campaign.abi.ts';

@Injectable({
  providedIn: 'root',
})
export class CampaignFactoryContractBuilder extends BaseContractBuilder {
  constructor() {
    super(campaignFactoryAbi);
    this.withAddress(environment.campaignFactory.address);
    this.withOptions(environment.campaignFactory.options);
  }
}
```

Dynamic builder with predefined abi:

```typescript
import { campaignAbi } from '../abi-files/campaign.abi.ts';

@Injectable({
  providedIn: 'root',
})
export class CampaignFactoryContractBuilder extends BaseContractBuilder {
  constructor() {
    super(campaignFactoryAbi);
  }
}
```

Builder with json ABI import:

```typescript
import campaignAbi from '../abi-files/campaign.abi.json';

@Injectable({
  providedIn: 'root',
})
export class CampaignFactoryContractBuilder extends BaseContractBuilder {
  constructor() {
    super(campaignFactoryAbi);
  }
}
```

#### BaseContractService

Base service for building your own Smart Contract interaction services.
You can just extend this class and implement your logic without thinking about web3.js interaction.

##### Example usage:

```typescript
@Injectable({
  providedIn: 'root',
})
export class CampaignPreviewService extends BaseContractService {
  constructor(
    private readonly _campaignContractBuilder: CampaignContractBuilder
  ) {
    super();
  }

  initializeContract(contractAddress: string): void {
    const contract = this._campaignContractBuilder
      .withAddress(contractAddress)
      .build();

    this.__initializeContract(contract);
  }

  campaignCreatedEvent$(): Observable<CampaignListItem> {
    return this.__getEvents$('CampaignCreated', (eventValues) => {
      const campaignAddress = eventValues[0] as string;
      const campaignName = eventValues[1] as string;
      return this._createCampaign(campaignAddress, campaignName);
    });
  }

  getCampaign$(): Observable<CampaignModel> {
    return this.__getData$<GetCampaignDto>('getCampaignInfo()').pipe(
      map((getCampaignDto: GetCampaignDto) =>
        this._mapCampaignDtoToModel(getCampaignDto)
      )
    );
  }

  private _getCandidateName(candidateAddress: string): Observable<string> {
    return this.__getData$<string>(
      'getCandidateNameById(address)',
      candidateAddress
    );
  }

  addCandidate$(
    candidateName: string,
    sendOptions: SendOptions
  ): Observable<void> {
    return this.__sendData$(
      'createCandidate(string)',
      sendOptions,
      candidateName
    );
  }
}
```
