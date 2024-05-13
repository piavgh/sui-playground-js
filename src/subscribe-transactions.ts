import 'dotenv/config';
import { getFullnodeUrl, SuiClient, SuiHTTPTransport } from '@mysten/sui.js/client';
import { WebSocket } from 'ws';


(async () => {
    const myAddress = process.env.WALLET;
    if (!myAddress) {
        throw new Error('WALLET environment variable must be set');
    }

    const client = new SuiClient({
        transport: new SuiHTTPTransport({
            url: getFullnodeUrl('devnet'),
            // The typescript definitions may not match perfectly, casting to never avoids these minor incompatibilities
            WebSocketConstructor: WebSocket as never,
        }),
    });

    const unsubscribe = await client.subscribeTransaction({
        filter: {
            FromAddress: myAddress,
        },
        onMessage(event) {
            // This function is called once per transaction.
            console.log('Received transaction:', event);
        },
    });

    // later, to unsubscribe:
    await unsubscribe();
})();
