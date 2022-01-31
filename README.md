<p align="center">
⭐ bitsong-faucet is a simple alternative to the tendermint/faucet script. This is an idea adapted for ➡️ <a href="https://bitsong.io/">BitSibg</a> and can be used for any project using bitsongjs.  
</p>


## Prerequisites

node version >=12.0.0

## Installation

```sh
git clone https://github.com/bitsongofficial/bitsong-faucet.git
cd bitsong-faucet
yarn
```
## Config
```sh
nano config.json
```
Edit this part with your value:
```
{
        "mnemonic": "",
        "address": "",
        "rpcUrl": "",
        "lport": 8000
}
```
## Run it (server side)
```
node --experimental-modules --es-module-specifier-resolution=node app.js
```
## Client request
```
curl -s "http://localhost:8000/?address=bitsong1zq68dx423frv8yss5skqyg5um97vpefefe2enq" | jq
```
