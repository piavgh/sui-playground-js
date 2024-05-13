import 'dotenv/config';
import { CoinBalance, getFullnodeUrl, SuiClient } from '@mysten/sui.js/client';
import { getFaucetHost, requestSuiFromFaucetV1 } from '@mysten/sui.js/faucet';
import { MIST_PER_SUI } from '@mysten/sui.js/utils';

(async () => {
    const myAddress = process.env.WALLET;
    if (!myAddress) {
        throw new Error('WALLET environment variable must be set');
    }

    // create a new SuiClient object pointing to the network you want to use
    const suiClient = new SuiClient({ url: getFullnodeUrl('devnet') });

    // Convert MIST to Sui
    const balance = (balance: CoinBalance) => {
        return Number.parseInt(balance.totalBalance) / Number(MIST_PER_SUI);
    };

    // store the JSON representation for the SUI the address owns before using faucet
    const suiBefore = await suiClient.getBalance({
        owner: myAddress,
    });

    await requestSuiFromFaucetV1({
        // use getFaucetHost to make sure you're using correct faucet address
        // you can also just use the address (see Sui TypeScript SDK Quick Start for values)
        host: getFaucetHost('devnet'),
        recipient: myAddress,
    });

    // store the JSON representation for the SUI the address owns after using faucet
    const suiAfter = await suiClient.getBalance({
        owner: myAddress,
    });

    // Output result to console.
    console.log(
        `Balance before faucet: ${balance(suiBefore)} SUI. Balance after: ${balance(
            suiAfter,
        )} SUI. Hello, SUI!`,
    );
})();