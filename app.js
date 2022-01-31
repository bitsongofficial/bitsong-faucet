/************************************/
/* Dev by atmon3r for Bitcanna Team, modified by @angelorc for bitsongofficial */ 
/* Run: node --experimental-modules --es-module-specifier-resolution=node app.js */
/************************************/

import fs from 'fs';
import express from 'express';
import bodyParser from 'body-parser';
import { DirectSecp256k1HdWallet } from '@cosmjs/proto-signing';
import { stringToPath } from '@cosmjs/crypto';
import { Bech32 } from '@cosmjs/encoding';
import { assertIsBroadcastTxSuccess } from '@cosmjs/stargate';
import { Constants, SigningBitsongClient } from '@bitsongjs/sdk';

let rawdata = fs.readFileSync('config.json');
let config = JSON.parse(rawdata);

// Express config
const app = express()
app.use(bodyParser.urlencoded({ extended: false }));

function isValidAddress (address) {
	try {
	  const { prefix, data } = Bech32.decode(address);
  
	  if (prefix !== "bitsong") {
		return false;
	  }
  
	  return data.length === 20;
	} catch {
	  return false;
	}
  }

async function sendTx(addressTo, res) {
	const faucetWallet = await DirectSecp256k1HdWallet.fromMnemonic(config.mnemonic, { prefix: Constants.Bech32PrefixAccAddr, hdPaths: [stringToPath(Constants.getHdPath())] });
	const bitsong = await SigningBitsongClient.connectWithSigner(config.rpcUrl, faucetWallet);

	// Send coins from faucet to the new account
    const amount = {
        denom: Constants.MicroDenom,
        amount: '10000000', // 10btsg
    };

	const defaultFee = {
		amount: [
			{
				denom: Constants.MicroDenom,
				amount: '2000',
			},
		],
		gas: '180000', // 180k
	};


	const result = await bitsong.sendTokens(config.address, addressTo, [amount], defaultFee, 'Have fun!');
	assertIsBroadcastTxSuccess(result);

	return res.send({"status": "ok"})
}

// Routing
app.get('/', async function (req, res) {
	res.setHeader('Content-Type', 'application/json');

	if (!isValidAddress(req.query.address)) {
		res.send({"status": "error"})
	} else {
		try {
			await sendTx(req.query.address,res)
		} catch (e) {
			return res.send({"status": "error"})
		}
	}	
})

app.listen(config.lport, function () {
	console.log('***********************************************')
	console.log('* Welcome on bitsong-faucet')	
	console.log('* bitsong-faucet app listening on port '+config.lport)
	console.log('**********************************************')
})
