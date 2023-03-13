# Urchin

## What is Urchin?
Urchin is a headless CMS protocol and SDK for dApp developers build on Solana, Arweave, and Bundlr.

## What does Urchin do?
Blockchain developers aim to avoid using databases and centralized storage as much as possible. However, it's quite some extra lifting to build all of the interfacing to store and retrieve mixed content data (e.g. profiles and blog posts) and files (e.g. videos, images, audio). Urchin is a simple SDK so decentralized applications can stay on-chain and off the cloud.

## How to start
```
const connection = urchin({
  payer,
  cluster: 'devnet',
});

const urchin.preflight();
```