var AssetTokenization = artifacts.require("./AssetTokenization.sol");
var VerificationList = artifacts.require("./VerificationList.sol");
var AssetTokenizationRegistry = artifacts.require("./AssetTokenizationRegistry.sol");

module.exports = async function (deployer, networks, accounts) {
  await deployer.deploy(VerificationList);
  await deployer.deploy(AssetTokenization);
  await deployer.deploy(AssetTokenizationRegistry);

  const verificationList = await VerificationList.deployed();

  let tempAssetTokenization = await AssetTokenization.deployed();
  console.log('Deployed AssetTokenization Address...', tempAssetTokenization.address);
  this.AssetTokenizationRegistry = await AssetTokenizationRegistry.deployed();
  let owner = await this.AssetTokenizationRegistry.owner();
  console.log('Registry Owner...', owner, typeof(owner));
  console.log('Accounts 0...', accounts[0], typeof(accounts[0]));
  await this.AssetTokenizationRegistry.addVersion(1, tempAssetTokenization.address);
  const version = await this.AssetTokenizationRegistry.getVersion(1);
  console.log('Registry Version...', version);
};
