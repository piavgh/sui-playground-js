import 'dotenv/config';
import { getFullnodeUrl, SuiClient, SuiHTTPTransport } from '@mysten/sui.js/client';
import { WebSocket } from 'ws';


(async () => {
    const myAddress = process.env.WALLET;
    if (!myAddress) {
        throw new Error('WALLET environment variable must be set');
    }

    console.log('myAddress: ', myAddress)
})();
