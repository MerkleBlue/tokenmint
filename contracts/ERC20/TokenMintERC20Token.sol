pragma solidity ^0.4.24;

import '../../node_modules/openzeppelin-solidity/contracts/token/ERC20/ERC20.sol';

/**
 * @title Standard ERC20 token with optional functions implemented
 * @author TokenMint.io
 *
 * @dev Implementation of the basic standard token. For full specification see:
 * https://github.com/ethereum/EIPs/blob/master/EIPS/eip-20.md
 */
contract TokenMintERC20Token is ERC20 {

    string public name;
    string public symbol;
    uint8 public decimals;

    constructor(string _name, string _symbol, uint8 _decimals, uint256 totalSupply, address feeReceiver) public payable {
      name = _name;
      symbol = _symbol;
      decimals = _decimals;

      // set sender as owner of all tokens
      _mint(msg.sender, totalSupply);
      //_totalSupply = totalSupply;

      // pay for service fee for contract deployment
      feeReceiver.transfer(msg.value);
    }

    // optional functions from ERC20 stardard

    /**
    * @dev Name of the ERC20 token
    */
    function name() public view returns (string) {
      return name;
    }

    /**
    * @dev Symbol of the ERC20 token
    */
    function symbol() public view returns (string) {
      return symbol;
    }

    /**
    * @dev Number of decimals of the ERC20 token
    */
    function decimals() public view returns (uint8) {
      return decimals;
    }
}
