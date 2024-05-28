#!/bin/bash
# generate random account
uuid=$(uuidgen | tr 'A-Z' 'a-z')
CONTRACT="devcontract-"${uuid:0:10}".testnet"
echo $CONTRACT
USER="devuser-"${uuid:0:10}".testnet"
echo $USER
BENEFICIARY="templateprojectmaster.testnet"

near create-account $CONTRACT --useFaucet
near deploy $CONTRACT ./build/contract.wasm
near create-account $USER --useFaucet
near view $CONTRACT getCount ''
near call $CONTRACT increase '{ "n": 1 }' --accountId $USER
near view $CONTRACT getCount ''
near call $CONTRACT decrease '{ "n": 2 }' --accountId $USER
near view $CONTRACT getCount ''

echo y | near delete $CONTRACT $BENEFICIARY
echo y | near delete $USER $BENEFICIARY