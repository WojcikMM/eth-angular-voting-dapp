# EthAngularApp
# Ethereum React dApp

This is project to present ability of usage Ethereum Blockchain with Smart Contracts.

Project contains fullstack app:
* Ethereum blockchain definition files - called in this docs `Truffle` files
* Ethereum client in Angular - called in this docs `Frontend` files
-----------------------------------------------------------------------------------------
## Project structure
In this project there are source files for:
### Truffle
* `contracts` - contains contracts and solidity libraries definitions
* `migrations` - contains migration files for deploy `contracts`
* `test` - contains tests for `contracts`

### Frontend
* `src` - contains source files for client app
-----------------------------------------------------------------------------------------
## Prerequisites
* Nodejs - LTS version
* Ganache (_optional_ but this is better option for development )
-----------------------------------------------------------------------------------------
## Available scripts

### Truffle
* `npm run truffle:compile` - compiles contracts and extract ABI files to `build` directory
* `npm run truffle:test` - run tests in `test` directory.
* `npm run truffle:migrate` - deploys contract to blockchain (defined in  `truffle-config.js`)
* `npm run truffle:develop` - starts local development blockchain ( but prefer use `Ganache` app)

### Frontend
* `npm run start` - runs application in development locally
* `npm run build` - build application and move artifacts to `build` directory
* `npm run test` - runs application's tests
-----------------------------------------------------------------------------------------

