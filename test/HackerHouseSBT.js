const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("HackerHouseSBT", function () {
  let sbt, owner, addr1, addr2;

  beforeEach(async function () {
    [owner, addr1, addr2] = await ethers.getSigners();
    
    const HackerHouseSBT = await ethers.getContractFactory("HackerHouseSBT");
    sbt = await HackerHouseSBT.deploy();
  });

  it("Should allow an address to mint an SBT", async function () {
    await sbt.connect(addr1).mint("Alice", "Developer", "Female");

    const sbtData = await sbt.getSBTData(addr1.address);
    expect(sbtData.name).to.equal("Alice");
    expect(sbtData.specialty).to.equal("Developer");
    expect(sbtData.gender).to.equal("Female");
  });

  it("Should prevent an address from minting more than one SBT", async function () {
    await sbt.connect(addr1).mint("Alice", "Developer", "Female");
    await expect(
      sbt.connect(addr1).mint("Bob", "Designer", "Male")
    ).to.be.revertedWith("This address already has an SBT");
  });

  it("Should return correct SBT data for a given address", async function () {
    await sbt.connect(addr1).mint("Alice", "Developer", "Female");

    const sbtData = await sbt.getSBTData(addr1.address);
    expect(sbtData.name).to.equal("Alice");
    expect(sbtData.specialty).to.equal("Developer");
    expect(sbtData.gender).to.equal("Female");
  });

  it("Should revert if an address does not own an SBT", async function () {
    await expect(sbt.getSBTData(addr1.address)).to.be.revertedWith(
      "This address does not have an SBT"
    );
  });

  it("Should prevent transfer of SBTs", async function () {
    await sbt.connect(addr1).mint("Alice", "Developer", "Female");

    const tokenId = await sbt.getOwnerTokenId(addr1.address); // ✅ Fix here

    await expect(
      sbt.connect(addr1).transferFrom(addr1.address, addr2.address, tokenId)
    ).to.be.revertedWith("SBT is not transferable");
  });

  it("Should return a valid tokenURI", async function () {
    await sbt.connect(addr1).mint("Alice", "Developer", "Female");

    const tokenId = await sbt.getOwnerTokenId(addr1.address); // ✅ Fix here

    const tokenURI = await sbt.tokenURI(tokenId);
    expect(tokenURI).to.include("data:application/json;base64,");
  });
});