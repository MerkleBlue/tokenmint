var TokenMintERC20Token = artifacts.require("./TokenMintERC20Token.sol");

module.exports = function(deployer) {
  deployer.deploy(TokenMintERC20Token, "TMT", "Token Mint Token", 18, 1000000000);
};
