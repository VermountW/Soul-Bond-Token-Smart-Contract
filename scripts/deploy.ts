import { ethers } from "hardhat";

async function main() {
  console.log("Deploying HackerHouseSBT contract...");
  
  const HackerHouseSBT = await ethers.getContractFactory("HackerHouseSBT");
  const otm = await HackerHouseSBT.deploy();

  console.log("Waiting for deployment transaction...");
  await otm.waitForDeployment();
  
  const address = await otm.getAddress();
  
  console.log(`HackerHouseSBT deployed successfully to: ${address}`);
  console.log(`Verify contract with:`);
  console.log(`npx hardhat verify --network mantaPacificTestnet ${address}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Error deploying contract:", error);
    process.exit(1);
  });