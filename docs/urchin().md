The entry point to the Urchin SDK is by creating an instance that will give you access to its API.

It accepts a Connection instance from `@solana/web3.js`that will be used to communicate with the cluster.

## Init Example

```javascript JavaScript
import {Keypair, Signer} from "@solana/web3js";

const connection = urchin(
    {
        payer:KeyPair: payer,
        ...parameters
    });


```



## Parameters

| label/required | description                     | type    | default  | valid values       |
| :------------- | :------------------------------ | :------ | :------- | :----------------- |
| payer\*        | public and private key of payer | Keypair |          |                    |
| owner      | author if different then payer  | Keypair  |          |                    |
| cluster        | Solana/Arweave environment      | string  | "devnet" | "devnet","mainnet" |
| rpc            | Custom Solana RPC               | string  |          |                    |

## Response Example

```javascript
{ queue: 
     {taxonomy: {create:[], update:[]}, template: {create:[], update:[]}, entry: {create:[], update:[]}, asset: {create: [], update:[]} }, 
     cluster: "devnet", 
     rpc: "https://api.devnet.solana.com",
     payer: "5SKNwTC2Svdd7AbynWTSwPdyZitDcLVcFeQrkqQ137Hd",
     owner: "HdKNt2TSwPdyZitDcLVcFwTC2SvitDcLVcFeQrkqQ131"
}
```



|    |
| :- |

# Processing Functions

`playa().reset()` // removes all functions awaiting run

`playa().run()` // runs all functions. If assets are uploading AND entries being created, entry values can scan for `{{filename}}` and replace with arweave URL