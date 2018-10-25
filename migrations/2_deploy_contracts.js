var TokenMintERC20Token = artifacts.require("./TokenMintERC20Token.sol");
var TokenMintERC223Token = artifacts.require("./TokenMintERC223Token.sol");

module.exports = function(deployer) {
  deployer.deploy(TokenMintERC20Token, 'TokenMint ERC20 Token', 'TM20', 18, 1000000000, '0x0000000000000000000000000000000000000000');
  deployer.deploy(TokenMintERC223Token, 'TokenMint ERC223 Token', 'TM22', 18, 1000000000, '0x0000000000000000000000000000000000000000');
};
