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

    // naming the function unsubscribe may seem counterintuitive here, but you call it later to unsubscribe from the event
    const unsubscribe = await client.subscribeEvent({
        filter: {
            Sender: myAddress,
        },
        onMessage(event) {
            // handle subscription notification message here. This function is called once per subscription message.
            console.log('Received event:', event);
        },
    });

    // later, to unsubscribe
    await unsubscribe();
})();
