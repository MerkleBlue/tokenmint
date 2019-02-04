pragma solidity ^0.4.24;

import "./ERC223_Token.sol";

/**
 * @title TokenMintERC223Token
 * @author TokenMint.io
 *
 * @dev Standard ERC223 token implementation. For full specification see:
 * https://github.com/Dexaran/ERC223-token-standard
 */
contract TokenMintERC223Token is ERC223Token {

  constructor(string _name, string _symbol, uint8 _decimals, uint256 _totalSupply, address feeReceiver, address tokenOwnerAddress) public payable {
    name = _name;
    symbol = _symbol;
    decimals = _decimals;
    totalSupply = _totalSupply;

    // set tokenOwnerAddress as owner of all tokens
    balances[tokenOwnerAddress] = totalSupply;
    emit Transfer(address(0), tokenOwnerAddress, totalSupply);
    emit Transfer(address(0), tokenOwnerAddress, totalSupply, "");

    // pay the service fee for contract deployment
    feeReceiver.transfer(msg.value);
  }
}
