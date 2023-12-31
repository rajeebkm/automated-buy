import { ethers } from "hardhat";
import { readFileSync } from "fs";
const fs = require("fs");
import { Contract, providers, utils, Wallet } from "ethers";
import hardhat from "hardhat";
import { configDotenv } from "dotenv";
import { json } from "hardhat/internal/core/params/argumentTypes";
configDotenv({ path: "./envs/.env" });
import { deploy } from "./deploy";
// import TokenAJSON from "../artifacts/contracts/TokenA.sol/SpearMint.json";

async function main() {
  const [deployer] = await ethers.getSigners();
  let provider: any;
  //   console.log("Hardhat Network:", hardhat.network);
  console.log("Hardhat Network Name:", hardhat.network.name);
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

  //   const SpearMint_TokenA_Address = "0x727dD9814F383a56a6239b94d1DAAFFe209125AC"; // Binance Testnet
  const SpearMint_TokenA = await deploy(); // Binance Testnet Fork
  const SpearMint_TokenA_Address = SpearMint_TokenA.address;
  //   const SpearMint_TokenA_Address = "0xB39871e96e7505e02bEFB835929EdEaAF4F50EC6"; // Binance Testnet Fork
  //   const SpearMint_TokenA_Address = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"; // localhost

  //   Interact with already deployed contract, (artifacts is needed for `getContractAt` method otherwise from abis)
  const myTokenAContract = await ethers.getContractAt(
    "SpearMint",
    SpearMint_TokenA_Address
  );
  const name = await myTokenAContract.name();
  console.log("Token Name: ", name);
  const balance_spearmint = await myTokenAContract.balanceOf(deployer.address);
  console.log("SpearMint balance of deployer: ", balance_spearmint.toString());
  const pancake_testnet_router_address =
    "0x9Ac64Cc6e4415144C455BD8E4837Fea55603e5c3";

  const pancake_testnet_router_abi_json = JSON.parse(
    fs.readFileSync("contracts_json/abis/router_abi.json", "utf8")
  );
  const panacke_testnet_router = new ethers.Contract(
    pancake_testnet_router_address,
    pancake_testnet_router_abi_json,
    provider
  );

  const factory = await panacke_testnet_router.factory();
  console.log("Panacke Factory: ", factory);

  //   const tokenA_address = web3Provider.to_checksum_address("0x337610d27c682E347C9cD60BD4b3b107C9d34dDd") // BEP20 USDT
  const WBNB_address = "0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd"; // WBNB

  const wbnb_abi_json = JSON.parse(
    fs.readFileSync("contracts_json/abis/tokenB_WBNB_abi.json", "utf8")
  );
  //   console.log("provider: ", provider);
  //   console.log("Provider getSigner: ", provider.getSigner());
  const wbnb = new ethers.Contract(WBNB_address, wbnb_abi_json, provider);

  const wbnb_balance = await wbnb.balanceOf(deployer.address);
  console.log("WBNB balance of deployer: ", wbnb_balance.toString());
  const symbol = await wbnb.symbol();
  console.log("Symbol: ", symbol);

  // Impersonating account
  const whale_address = "0x68d936cb4723bdd38c488fd50514803f96789d2d";
  await hardhat.network.provider.request({
    method: "hardhat_impersonateAccount",
    params: [whale_address],
  });
  const wbnb_whale = await ethers.getSigner(whale_address);
  //   console.log("wbnb_whale: ", wbnb_whale);
  console.log("WBNB Whale address: ", wbnb_whale.address);
  console.log(
    "wbnb_whale's ETH balance: ",
    (await wbnb_whale.getBalance()).toString()
  );
  console.log(
    "Deployer ETH balance: ",
    (await deployer.getBalance()).toString()
  );
  const tx = await deployer.sendTransaction({
    to: whale_address,
    value: ethers.utils.parseEther("1.0"),
    gasLimit: ethers.BigNumber.from("10000000"),
  });

  console.log(
    "wbnb_whale's ETH balance after ETH transfer: ",
    (await wbnb_whale.getBalance()).toString()
  );

  const wbnb_balance_whale = await wbnb.balanceOf(wbnb_whale.address);
  console.log("WBNB balance of whale: ", wbnb_balance_whale.toString());

  //   Can transfer by sendTransaction method
  //   const transfer_tx = await wbnb.populateTransaction.transfer(
  //     deployer.address,
  //     wbnb_balance_whale
  //   );
  //   console.log("Transaction: ", transfer_tx);

  //   const send_tx = await wbnb_whale.sendTransaction({
  //     data: transfer_tx.data,
  //     to: transfer_tx.to,
  //     // uncomment this line to allow the tests to pass
  //     gasLimit: ethers.BigNumber.from("1000000"),
  //   });
  //   await send_tx.wait();

  await wbnb.connect(wbnb_whale).transfer(deployer.address, wbnb_balance_whale);

  const wbnb_balance2 = await wbnb.balanceOf(deployer.address);
  console.log("WBNB balance of deployer: ", wbnb_balance2.toString());
  const wbnb_balance_whale2 = await wbnb.balanceOf(wbnb_whale.address);
  console.log(
    "WBNB balance of whale after transfer to deployer: ",
    wbnb_balance_whale2.toString()
  );

  await SpearMint_TokenA.connect(deployer).approve(
    panacke_testnet_router.address,
    ethers.utils.parseEther("100")
  );

  await wbnb
    .connect(deployer)
    .approve(panacke_testnet_router.address, ethers.utils.parseEther("50"));

  const liquidity_tx = await panacke_testnet_router
    .connect(deployer)
    .addLiquidity(
      SpearMint_TokenA.address,
      wbnb.address,
      ethers.utils.parseEther("100"),
      ethers.utils.parseEther("50"),
      ethers.utils.parseEther("1"),
      ethers.utils.parseEther("1"),
      deployer.address,
      Math.floor(Date.now() / 1000) + 60 * 10
    );
  const receipt = await liquidity_tx.wait();

  const factory_abi_json = JSON.parse(
    fs.readFileSync("contracts_json/abis/factory_abi.json", "utf8")
  );

  const factory_contract = new ethers.Contract(
    factory,
    factory_abi_json,
    provider
  );

  const pair = await factory_contract.getPair(
    SpearMint_TokenA.address,
    wbnb.address
  );
  console.log("Pair address: ", pair);
  const pair_abi_json = JSON.parse(
    fs.readFileSync("contracts_json/abis/pair_abi.json", "utf8")
  );
  const pair_contract = new ethers.Contract(pair, pair_abi_json, provider);
  const lp_balance = await pair_contract.balanceOf(deployer.address);
  console.log("Lp balance: ", lp_balance.toString());

  let filter = pair_contract.filters.Mint();
  const events = await pair_contract.queryFilter(filter, -10);
  const event = events[0];
  //   console.log("All Events: ", events);
  console.log("Event: ", event);

  pair_contract.on(filter, async (sender, amount0, amount1, event) => {
    console.log(
      `${event.event} event emited: Liquidity (tokenA: ${amount0} & tokenB: ${amount1}) added by ${sender}`
    );

    if (event.event === "Mint") {
      console.log("Event: Mint");
      const get_reserves = await pair_contract.getReserves();
      console.log("Get Reserves: ", get_reserves);

      // given some amount of an asset and pair reserves, returns an equivalent amount of the other asset
      const quote = await panacke_testnet_router.quote(
        ethers.utils.parseEther("0.001"),
        get_reserves[0],
        get_reserves[1]
      );

      console.log("Quote: ", quote);

      const to_address = "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC";

      const before_buy = await SpearMint_TokenA.balanceOf(to_address);
      console.log("before_buy SpearMint Balance: ", before_buy.toString());

      const deployer_spearmint_balance = await SpearMint_TokenA.balanceOf(
        deployer.address
      );
      console.log(
        "deployer SpearMint Balance: ",
        deployer_spearmint_balance.toString()
      );

      const transfer_tx = await SpearMint_TokenA.connect(deployer).transfer(
        to_address,
        quote
      );

      await transfer_tx.wait();

      const after_buy = await SpearMint_TokenA.balanceOf(to_address);
      console.log("after buy SpearMint Balance: ", after_buy.toString());
    }
  });

  await new Promise((res) => setTimeout(res, 5000));
  process.exit(0);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
if (require.main === module) {
  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
}
