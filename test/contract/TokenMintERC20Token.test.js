const { assertRevert } = require('../helpers/assertRevert');
const TokenContract = artifacts.require('TokenMintERC20Token');

contract('TokenMintERC20Token', function ([_, owner, recipient, anotherAccount]) {
  const TOKENMINT_ADDRESS = "0x6603cb70464ca51481d4edBb3B927F66F53F4f42";

  beforeEach(async function () {
    this.token = await TokenContract.new("My Test Token", "SYM", 18, 100, TOKENMINT_ADDRESS, owner, { from: owner });
  });

  describe('token name', function () {
    it('returns the name of the token', async function () {
      const name = await this.token.name();

      assert.equal(name, "My Test Token");
    });
  });

  describe('token symbol', function () {
    it('returns the symbol of the token', async function () {
      const symbol = await this.token.symbol();

      assert.equal(symbol, "SYM");
    });
  });

  describe('decimals', function () {
    it('returns the number of token decimals', async function () {
      const decimals = await this.token.decimals();

      assert.equal(decimals, 18);
    });
  });
});
