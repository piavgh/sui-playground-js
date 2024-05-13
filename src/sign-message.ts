import 'dotenv/config';
import { Ed25519Keypair } from '@mysten/sui.js/keypairs/ed25519';
import { decodeSuiPrivateKey } from '@mysten/sui.js/cryptography';

async function handleSignMsg() {
  try {
    const privateKey = process.env.PRIVATE_KEY;
    if (!privateKey) {
      throw new Error('PRIVATE_KEY environment variable must be set');
    }
    // const keypair = new Ed25519Keypair();
    // const privateKey = keypair.getSecretKey();

    // // create UInt8Array from privateKey
    const { secretKey } = decodeSuiPrivateKey(privateKey);
    const keypair = Ed25519Keypair.fromSecretKey(secretKey);

    const publicKey = keypair.getPublicKey();

    const address = publicKey.toSuiAddress();
    let nonce = "uwRq5SOaJgbc96fb"
    const msg = `${address}-${nonce}`
    // convert string to Uint8Array 
    const msgBytes = new TextEncoder().encode(msg)
    const { signature } = await keypair.signPersonalMessage(msgBytes);

    const isValid = await publicKey.verifyPersonalMessage(msgBytes, signature);
    console.log("msg: ", msg);
    console.log("signature: ", signature);

    if (!isValid) {
      console.log('signMessage succeed, but verify signedMessage failed')
    } else {
      console.log('signMessage succeed, and verify signedMessage succeed!')
    }
  } catch (e) {
    console.error('signMessage failed', e)
  }
}

// immediately call handleSignMsg in main function
(async () => {
  await handleSignMsg();
})();

