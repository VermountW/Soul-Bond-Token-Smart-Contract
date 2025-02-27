import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import { vars } from "hardhat/config";

const PRIVATE_KEY = vars.get("PRIVATE_KEY");

const config: HardhatUserConfig = {
  solidity: "0.8.24",
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545",
      chainId: 31337,
    },
    mantaPacificTestnet: {
      url: "https://pacific-rpc.sepolia-testnet.manta.network/http",
      accounts: [PRIVATE_KEY],
      chainId: 3441006,
    },
  },
  etherscan: {
    apiKey: {
      mantaPacificTestnet: "any",
    },
    customChains: [
      {
        network: "mantaPacificTestnet",
        chainId: 3441006,
        urls: {
          apiURL: "https://pacific-explorer.sepolia-testnet.manta.network/api",
          browserURL: "https://pacific-explorer.sepolia-testnet.manta.network",
        },
      },
    ],
  },
};

export default config;