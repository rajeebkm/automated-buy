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
  //   const TokenA_Address = "0x727dD9814F383a56a6239b94d1DAAFFe209125AC"; // Binance Testnet

  //   Can deploy and interact
  const SpearMint = await ethers.getContractFactory("SpearMint");
  const spearmint = await SpearMint.deploy("SpearMint", "SpearMint");
  await spearmint.deployed();
  console.log(`SpearMint deployed to ${spearmint.address}`);
  const name = await spearmint.name();
  console.log(name);

  //   Interact with already deployed contract
  const myTokenAContract = await ethers.getContractAt(
    "SpearMint",
    spearmint.address
  );
  const names1 = await myTokenAContract.name();
  console.log(names1);

  //   Or,
  const TokenA = await ethers.getContractFactory("SpearMint"); // We can use already deployed
  const tokenA = TokenA.attach(spearmint.address);
  const names2 = await tokenA.name();
  console.log(names2);

  //   Or, we can instantiate the deployed contract with a provider/signer using its address
  let provider: any;
  //   console.log("Hardhat Network:", hardhat.network);
  console.log("Network Network Name:", hardhat.network.name);
  if (
    hardhat.network.name === "localhost" ||
    hardhat.network.name === "hardhat"
  ) {
    provider = new ethers.providers.JsonRpcProvider();
  } else if (hardhat.network.name === "sepolia") {
    provider = new ethers.providers.JsonRpcProvider();
    //   "https://eth-sepolia.g.alchemy.com/v2/<key>"
  } else if (hardhat.network.name === "binanceTestnet") {
    provider = new ethers.providers.JsonRpcProvider(
      `https://bsc-testnet.nodereal.io/v1/${process.env.NODEREAL_API_KEY}`
    );
  }

  const TokenAJSON = JSON.parse(
    fs.readFileSync("artifacts/contracts/TokenA.sol/SpearMint.json", "utf8")
  );
  const tokenAContract = new ethers.Contract(
    spearmint.address,
    TokenAJSON.abi,
    provider
  );

  //   tokenAContract.connect(deployer);
  const names = await tokenAContract.name();
  console.log(names);

  // Need to test below 2 commented part
  /*
  const testTokenContract = new Contract(
    testTokenAddress,
    testTokenAbi,
    wallet
  );
*/

  /*
  const accounts = await hardhat.ethers.getSigners();
  const MyContract = await ethers.getContractFactory("MyContract");
  const myContract = new ethers.Contract(
    MyContract,
    MyContract.interface,
    accounts[0]
  );
*/
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
