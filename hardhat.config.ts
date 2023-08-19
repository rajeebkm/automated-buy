import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
require("dotenv").config({ path: "./envs/.env" });
const private_key: any = process.env.WALLET_PRIVATE_KEY;

const config: HardhatUserConfig = {
  solidity: "0.8.19",
  // defaultNetwork: "sepolia",
  networks: {
    hardhat: {},
    binanceTestnet: {
      url: "https://bsc-testnet.nodereal.io/v1/97f3d16bb5c24f1d840d40a3172b0168",
      accounts: [private_key],
    },
    // sepolia: {
    //   url: "https://eth-sepolia.g.alchemy.com/v2/<key>",
    //   accounts: [privateKey1, privateKey2, ...]
    // },
    // localhost: {
    //   url: `http://localhost:8545`,
    // },
  },
};

export default config;
