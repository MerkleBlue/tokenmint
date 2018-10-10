pragma solidity ^0.4.24;

import "./ERC223_Token.sol";

/**
 * @title Standard ERC223 token
 * @author TokenMint.io
 *
 * @dev Implementation of the basic standard token. For full specification see:
 * https://github.com/Dexaran/ERC223-token-standard
 */
contract TokenMintERC223Token is ERC223Token {

  constructor(string _name, string _symbol, uint8 _decimals, uint256 _initialAmount) public {
    name = _name;
    symbol = _symbol;
    decimals = _decimals;
    totalSupply = _initialAmount;

    balances[msg.sender] = _initialAmount;
  }
}
