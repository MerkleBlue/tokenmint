pragma solidity ^0.4.24;

import "../open-zeppelin-contracts/token/ERC20/IERC20.sol";
import "../open-zeppelin-contracts/crowdsale/validation/TimedCrowdsale.sol";
import "../open-zeppelin-contracts/crowdsale/validation/CappedCrowdsale.sol";
import "../open-zeppelin-contracts/crowdsale/emission/AllowanceCrowdsale.sol";

/**
 * @title TCACrowdsale
 * @dev TCACrowdsale is an ERC-20 tokens crowdsale. Contract uses ETH as a fund raising currency. Features:
 *   - Capped - has a cap (maximum, hard cap) on ETH funds raised
 *   - Allowance - it uses already deployed ERC-20 token, using approve function
 *   - Timed - has opening and closing time
 * @author TokenMint.io
 */
contract TCACrowdsale is TimedCrowdsale, CappedCrowdsale, AllowanceCrowdsale {
    /**
    * @dev Constructor, creates CARPDCrowdsale.
    * @param openingTime Crowdsale opening time
    * @param closingTime Crowdsale closing time
    * @param rate How many smallest token units a buyer gets per wei
    * @param fundRaisingAddress Address where raised funds will be transfered if crowdsale is successful
    * @param tokenContractAddress Token being sold, already deployed
    * @param cap Cap on funds raised (maximum, hard cap)
    * @param tokenHolderAddress Address holding the tokens, must approve allowance to the crowdsale contract
    * @param feeReceiverAddress Address that receives fees for contract deployment
    */
    constructor (
        uint256 openingTime,
        uint256 closingTime,
        uint256 rate,
        address fundRaisingAddress,
        IERC20 tokenContractAddress,
        uint256 cap,
        address tokenHolderAddress,
        address feeReceiverAddress
    )
        public payable
        Crowdsale(rate, fundRaisingAddress, tokenContractAddress)
        CappedCrowdsale(cap)
        AllowanceCrowdsale(tokenHolderAddress)
        TimedCrowdsale(openingTime, closingTime)
    {
      // pay the service fee for contract deployment
      feeReceiverAddress.transfer(msg.value);
    }
}
