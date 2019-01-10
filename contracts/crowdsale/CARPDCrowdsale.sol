pragma solidity ^0.4.24;

import "../open-zeppelin-contracts/token/ERC20/IERC20.sol";
import "../open-zeppelin-contracts/crowdsale/validation/CappedCrowdsale.sol";
import "../open-zeppelin-contracts/crowdsale/emission/AllowanceCrowdsale.sol";
import "../open-zeppelin-contracts/crowdsale/distribution/RefundablePostDeliveryCrowdsale.sol";

/**
 * @title CARPDCrowdsale
 * @dev CARPDCrowdsale is an ERC-20 tokens crowdsale. Contract uses ETH as a fund raising currency. Features:
 *   - Capped - has a cap (maximum, hard cap) on ETH funds raised
 *   - Allowance - it uses already deployed ERC-20 token, using approve function
 *   - Timed - has opening and closing time
 *   - Refundable - has a goal (minimum, soft cap), if not exceeded, funds are returned to investors
 *   - PostDelivery - tokens are withdrawn after crowsale is successfully finished
 * @author TokenMint.io
 */
contract CARPDCrowdsale is CappedCrowdsale, AllowanceCrowdsale, RefundablePostDeliveryCrowdsale {
    /**
    * @dev Constructor, creates CARPDCrowdsale.
    * @param openingTime Crowdsale opening time
    * @param closingTime Crowdsale closing time
    * @param rate How many smallest token units a buyer gets per wei
    * @param fundRaisingAddress Address where raised funds will be transfered if crowdsale is successful
    * @param tokenContractAddress IERC20 contract address of the token being sold, already deployed
    * @param cap Cap on funds raised (maximum, hard cap)
    * @param goal Goal on funds raised (minimum, soft cap)
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
        uint256 goal,
        address tokenHolderAddress,
        address feeReceiverAddress
    )
        public payable
        Crowdsale(rate, fundRaisingAddress, tokenContractAddress)
        CappedCrowdsale(cap)
        AllowanceCrowdsale(tokenHolderAddress)
        TimedCrowdsale(openingTime, closingTime)
        RefundableCrowdsale(goal)
    {
      // As goal needs to be met for a successful crowdsale
      // the value needs to less or equal than a cap which is limit for accepted funds
      require(goal <= cap);

      // pay the service fee for contract deployment
      feeReceiverAddress.transfer(msg.value);
    }
}
