const { assertRevert } = require('../helpers/assertRevert');
const TokenContract = artifacts.require('TokenMintERC223Token');

contract('TokenMintERC223Token', function ([_, owner, recipient, anotherAccount]) {
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

  describe('total supply', function () {
    it('returns the total amount of tokens', async function () {
      const totalSupply = await this.token.totalSupply();

      assert.equal(totalSupply, 100);
    });
  });

  describe('balanceOf', function () {
    describe('when the requested account has no tokens', function () {
      it('returns zero', async function () {
        const balance = await this.token.balanceOf(anotherAccount);

        assert.equal(balance, 0);
      });
    });

    describe('when the requested account has some tokens', function () {
      it('returns the total amount of tokens', async function () {
        const balance = await this.token.balanceOf(owner);
        assert.equal(balance, 100);
      });
    });
  });

  describe('transfer with 2 arguments', function () {
    describe('when the recipient is not the zero address', function () {
      const to = recipient;

      describe('when the sender does not have enough balance', function () {
        const amount = 101;

        it('reverts', async function () {
          await assertRevert(this.token.transfer(to, amount, { from: owner }));
        });
      });

      describe('when the sender has enough balance', function () {
        const amount = 100;

        it('transfers the requested amount', async function () {
          await this.token.transfer(to, amount, { from: owner });
          const senderBalance = await this.token.balanceOf(owner);
          assert.equal(senderBalance, 0);
          const recipientBalance = await this.token.balanceOf(to);
          assert.equal(recipientBalance, amount);
        });

        it('emits a transfer event', async function () {
          const { logs } = await this.token.transfer(to, amount, { from: owner });

          assert.equal(logs.length, 1);
          assert.equal(logs[0].event, 'Transfer');
          assert.equal(logs[0].args.from, owner);
          assert.equal(logs[0].args.to, to);
          assert(logs[0].args.value.eq(amount));
        });
      });
    });
  });
});
