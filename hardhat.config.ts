import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
require("dotenv").config({ path: "./envs/.env" });
const private_key: any = process.env.WALLET_PRIVATE_KEY;

const NODEREAL_API_KEY = process.env.NODEREAL_API_KEY;

const config: HardhatUserConfig = {
  solidity: "0.8.19",
  // defaultNetwork: "sepolia",
  networks: {
    hardhat: {},
    binanceTestnet: {
      url: `https://bsc-testnet.nodereal.io/v1/${NODEREAL_API_KEY}`,
      accounts: [private_key],
    },
    // sepolia: {
    //   url: "https://eth-sepolia.g.alchemy.com/v2/<key>",
    //   accounts: [privateKey1, privateKey2, ...]
    // },
    // localhost: {
    //   url: `http://localhost:8545`,
    // },
    forking: {
      url: `https://bsc-testnet.nodereal.io/v1/${NODEREAL_API_KEY}`,
    },
  },
};

export default config;
