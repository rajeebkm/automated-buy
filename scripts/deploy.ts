import { ethers } from "hardhat";

export async function deploy() {
  const [deployer] = await ethers.getSigners();

  const SpearMint = await ethers.getContractFactory("SpearMint");
  const spearmint = await SpearMint.deploy("SpearMint", "SpearMint");

  await spearmint.deployed();

  console.log(`SpearMint deployed to ${spearmint.address}`);
  return spearmint;
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
if (require.main === module) {
  deploy().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
}
