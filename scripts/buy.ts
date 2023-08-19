import { ethers } from "hardhat";
import { readFileSync } from "fs";
const fs = require("fs");
import { Contract, providers, utils, Wallet } from "ethers";
import hardhat from "hardhat";
import { configDotenv } from "dotenv";
import { json } from "hardhat/internal/core/params/argumentTypes";
configDotenv({ path: "./envs/.env" });
// import TokenAJSON from "../artifacts/contracts/TokenA.sol/SpearMint.json";

async function main() {
  const [deployer] = await ethers.getSigners();
//   const SpearMint_TokenA_Address = "0x727dD9814F383a56a6239b94d1DAAFFe209125AC"; // Binance Testnet
  const SpearMint_TokenA_Address = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"; // localhost

  //   Interact with already deployed contract
  const myTokenAContract = await ethers.getContractAt(
    "SpearMint",
    SpearMint_TokenA_Address
  );
  const names1 = await myTokenAContract.name();
  console.log(names1);

  //   console.log(`setting for ${proxyContractName} upgrade hash...........`);
  //   const call = proxyContract.populate("upgrade", [newClassHash]);
  //   await myExecute(account, [call]);
  //   console.log(`✅ update ${proxyContractName} done `);

  //   const SpearMint = await ethers.getContractFactory("SpearMint");
  //   const spearmint = await SpearMint.deploy("SpearMint", "SpearMint");

  //   await spearmint.deployed();

  //   console.log(`SpearMint deployed to ${spearmint.address}`);
  //   console.log(
  //     "tBNB balance: ",
  //     await ethers.provider.getBalance(deployer.address)
  //   );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
