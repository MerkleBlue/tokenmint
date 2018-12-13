var TokenMintERC20Token = artifacts.require("./TokenMintERC20Token.sol");
var TokenMintERC223Token = artifacts.require("./TokenMintERC223Token.sol");


var SafeMathLib = artifacts.require("./SafeMathLib.sol");
var FlatPricing = artifacts.require("./FlatPricing.sol");
var CrowdsaleToken = artifacts.require("./CrowdsaleToken.sol");

module.exports = function(deployer) {
  // deploy tokens
  deployer.deploy(TokenMintERC20Token, 'TokenMint ERC20 Token', 'TM20', 18, 1000000000, '0x0000000000000000000000000000000000000000', '0x6762b35cabe38f11a62ae1859fb7ae3354a7034d');
  deployer.deploy(TokenMintERC223Token, 'TokenMint ERC223 Token', 'TM22', 18, 1000000000, '0x0000000000000000000000000000000000000000', '0x0000000000000000000000000000000000000000');

  // deploy ico contracts
  deployer.deploy(SafeMathLib);

  deployer.link(SafeMathLib, FlatPricing);
  deployer.deploy(FlatPricing, 100);

  deployer.link(SafeMathLib, CrowdsaleToken);
  deployer.deploy(CrowdsaleToken, 'Crowdsale Token', 'CST', 18, 1000000000, true);
};
