pragma solidity ^0.4.24;

 /**
 * ERC223 token by Dexaran
 *
 * https://github.com/Dexaran/ERC223-token-standard
 *
 * NOTE: original event was:
 *    event Transfer(address indexed from, address indexed to, uint value, bytes indexed data);
 * however 'bytes indexed data' was replaced with 'bytes data' because of this issue with truffle tests:
 * https://github.com/trufflesuite/truffle/issues/405
 *
 */
contract ERC223 {
  uint public totalSupply;
  function balanceOf(address who) public view returns (uint);

  function name() public view returns (string _name);
  function symbol() public view returns (string _symbol);
  function decimals() public view returns (uint8 _decimals);
  function totalSupply() public view returns (uint256 _supply);

  function transfer(address to, uint value) public returns (bool ok);
  function transfer(address to, uint value, bytes data) public returns (bool ok);
  function transfer(address to, uint value, bytes data, string custom_fallback) public returns (bool ok);

  event Transfer(address indexed from, address indexed to, uint value, bytes data);
}
