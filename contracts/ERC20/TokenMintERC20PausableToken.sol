pragma solidity ^0.4.24;

import '../../node_modules/openzeppelin-solidity/contracts/token/ERC20/ERC20.sol';
import '../../node_modules/openzeppelin-solidity/contracts/lifecycle/Pausable.sol';

/**
 * @title TokenMintERC20PausableToken
 * @author TokenMint.io
 *
 * @dev Pausable ERC20 token with optional functions implemented.
 * When token is paused, no one can transfer tokens, but can approve.
 * Approval can be used for multi-stage ICO where the owner approves
 * certain amount of tokens for crowdsale.
 * For full specification of ERC-20 standard see:
 * https://github.com/ethereum/EIPs/blob/master/EIPS/eip-20.md
 */
contract TokenMintERC20PausableToken is ERC20, Pausable {

    string private _name;
    string private _symbol;
    uint8 private _decimals;

    constructor(string name, string symbol, uint8 decimals, uint256 totalSupply, address feeReceiver, address tokenOwnerAddress) public payable {
      _name = name;
      _symbol = symbol;
      _decimals = decimals;

      // set tokenOwnerAddress as owner of all tokens
      _mint(tokenOwnerAddress, totalSupply);

      // pay the service fee for contract deployment
      feeReceiver.transfer(msg.value);
    }

    function transfer(address to, uint256 value) public whenNotPaused returns (bool) {
      return super.transfer(to, value);
    }

    function transferFrom(address from,address to, uint256 value) public whenNotPaused returns (bool) {
      return super.transferFrom(from, to, value);
    }

    function increaseAllowance(address spender, uint addedValue) public whenNotPaused returns (bool success) {
      return super.increaseAllowance(spender, addedValue);
    }

    function decreaseAllowance(address spender, uint subtractedValue) public whenNotPaused returns (bool success) {
      return super.decreaseAllowance(spender, subtractedValue);
    }

    // optional functions from ERC20 stardard

    /**
     * @return the name of the token.
     */
    function name() public view returns (string) {
      return _name;
    }

    /**
     * @return the symbol of the token.
     */
    function symbol() public view returns (string) {
      return _symbol;
    }

    /**
     * @return the number of decimals of the token.
     */
    function decimals() public view returns (uint8) {
      return _decimals;
    }
}
