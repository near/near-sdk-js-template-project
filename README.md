# NEAR-SDK-JS template project

This is a template project. It implements a counter. You can copy this folder to start writing your first contract.

# Build the contract

```
npm i
npm run build
```

# Run tests on local node
```
npm run test:template
```

# Run tests on testnet
save 
```shell
echo "your testnet master account wallet" >> .near-credentials/workspaces/testnet/'$TESTNET_MASTER_ACCOUNT_ID'.json
```

```shell
TESTNET_MASTER_ACCOUNT_ID='your master account id' npm run test:testnetdeploy
```
current master account run by ci on testnet is [templateprojectmaster.testnet](https://testnet.nearblocks.io/address/templateprojectmaster.testnet)

# in gitlab ci, the testnet master account's secret is reserved on git secrets: https://docs.github.com/en/actions/security-guides/using-secrets-in-github-actions

# testnet deploy use near-cli
This test script will create accounts with faucet to deploy and call contract
* run test shell
```shell
npm run test:clidevdeploy
```