pragma solidity ^0.4.24;

import '../../node_modules/openzeppelin-solidity/contracts/token/ERC20/ERC20Mintable.sol';

/**
 * @title TokenMintERC20MintableToken
 * @author TokenMint.io
 * @dev Mintable ERC20 token with optional functions implemented.
 * For full specification of ERC-20 standard see:
 * https://github.com/ethereum/EIPs/blob/master/EIPS/eip-20.md
 */
contract TokenMintERC20MintableToken is ERC20Mintable {

    string private _name;
    string private _symbol;
    uint8 private _decimals;

    constructor(string name, string symbol, uint8 decimals, uint256 initialSupply, address feeReceiver, address tokenOwnerAddress) public payable {
      _name = name;
      _symbol = symbol;
      _decimals = decimals;

      // set tokenOwnerAddress as owner of initial supply, more tokens can be minted later
      _mint(tokenOwnerAddress, initialSupply);

      // pay the service fee for contract deployment
      feeReceiver.transfer(msg.value);
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
