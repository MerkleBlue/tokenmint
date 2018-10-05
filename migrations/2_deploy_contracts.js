var TokenMintERC20Token = artifacts.require("./TokenMintERC20Token.sol");

module.exports = function(deployer) {
  deployer.deploy(TokenMintERC20Token, "Token Mint Token", "TMT", 18, 1000000000);
};
