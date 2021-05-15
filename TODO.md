# List of tasks TODO:

- use custom webpack to support :  
  Try https://stackoverflow.com/questions/51068908/angular-cli-custom-webpack-config
```json
{
  "browser": {
    "crypto": true,
    "stream": true,
    "fs": "empty"
  }
}
```

- maybe add/create new one library with copy-abi-files & custom webpack for web3 angular configuration
- change type of BaseContractService to not be a AbstractClass ( it fails on unit tests)
- script to publish ng-web3
