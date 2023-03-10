// import urchin from '../index';
// import { Keypair, Connection, LAMPORTS_PER_SOL, PublicKey } from '@solana/web3.js';
// import testKeypair from './test-wallet';

// describe('Manage template', () => {

//     const payer = testKeypair;

//     let pubkey: PublicKey = payer.publicKey;

//     it("should create a new template", async () => {
//         const u = urchin({
//             payer,
//             cluster: "devnet",
//         });
//         u.template.create(
//             [
//                 { 
//                     title: "field1", 
//                     inputs: [
//                         { label: "text", type: "text", validation: { 
//                             type: "text", 
//                             min: 1, 
//                             max: 100 
//                         }  }
//                     ], 
//                     original: payer.publicKey, 
//                     archived: false, 
//                     taxonomies: [payer.publicKey],
                    
//                 }
//             ]
//         )

// const preflight = await u.preflight();
// console.log("PREFLIGHT::", preflight);

// const r = await u.process();
// console.log("PROCESS::", r);
// pubkey = new PublicKey(r.template[0].publicKey);

//   }).timeout(100000);

// it("should update a new template", async () => {
//     const u = urchin({
//         payer,
//         cluster: "devnet",
//     });
//     u.template.update([{ publicKey: pubkey, archived: true, owner: payer }])

//     const preflight = await u.preflight();
//     console.log("PREFLIGHT::", preflight);

//     const r = await u.process();
//     console.log("PROCESS::", r);

// }).timeout(100000);

// });


