import { Ed25519Keypair } from '@mysten/sui.js/keypairs/ed25519';
import { BCS, getSuiMoveConfig } from '@mysten/bcs';
import { IntentScope } from '@mysten/sui.js/cryptography';

const signWithIntent = async () => {
    // Initialize BCS.
    let bcs = new BCS(getSuiMoveConfig());

    // Generate a Ed25519 keypair.
    const keypair = Ed25519Keypair.generate();
    const pk = keypair.getPublicKey();

    // Convert message string to bytes because signWithIntent expects Uint8Array.
    const data = "Hello world";
    const bytes = bcs.ser(['string', BCS.STRING], data).toBytes();

    const sig = await keypair.signWithIntent(bytes, IntentScope.PersonalMessage);

    const verifiedPublicKey = await pk.verifyWithIntent(
        bytes,
        sig.signature,
        IntentScope.PersonalMessage
    );

    console.log(
        'VERIFIED',
        verifiedPublicKey
    );
}
const main = async () => {
    await signWithIntent();
}

main().catch(console.error);