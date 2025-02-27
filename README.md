# HackerHouseSBT

Soulbound Token (SBT) implementation using the ERC721 standard. This smart contract allows users to mint a non-transferable SBT that represents their identity, including name, specialty, and gender.

## Features
- Each address can only mint one SBT.
- The SBT contains personal information: `name`, `specialty`, and `gender`.
- The SBT is **non-transferable**.
- Provides metadata in Base64-encoded JSON format.

## Deploying the Contract Using Hardhat

### 1. Compile the Contract
```bash
npx hardhat compile
```
### 2. Setting Environment Variables
```bash
npx hardhat vars set PRIVATE_KEY
```

### 3. Deploy the Contract
```bash
npx hardhat run scripts/deploy.ts --network mantaPacificTestnet
```
### 4. Verifying the Contract
```bash
npx hardhat verify --network mantaPacificTestnet <DEPLOYED_CONTRACT_ADDRESS>
```
