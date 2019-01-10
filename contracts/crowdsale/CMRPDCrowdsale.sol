pragma solidity ^0.4.24;

import "../open-zeppelin-contracts/token/ERC20/ERC20Mintable.sol";
import "../open-zeppelin-contracts/crowdsale/validation/CappedCrowdsale.sol";
import "../open-zeppelin-contracts/crowdsale/emission/MintedCrowdsale.sol";
import "../open-zeppelin-contracts/crowdsale/distribution/RefundablePostDeliveryCrowdsale.sol";

/**
 * @title CMRPDCrowdsale
 * @dev CMRPDCrowdsale is an ERC-20 tokens crowdsale. Contract uses ETH as a fund raising currency. Features:
 *   - Capped - has a cap (maximum, hard cap) on ETH funds raised
 *   - Minted - new tokens are minted during crowdsale
 *   - Timed - has opening and closing time
 *   - Refundable - has a goal (minimum, soft cap), if not exceeded, funds are returned to investors
 *   - PostDelivery - tokens are withdrawn after crowsale is successfully finished
 * @author TokenMint.io
 */
contract CMRPDCrowdsale is CappedCrowdsale, MintedCrowdsale, RefundablePostDeliveryCrowdsale {
    /**
    * @dev Constructor, creates CMRPDCrowdsale.
    * @param openingTime Crowdsale opening time
    * @param closingTime Crowdsale closing time
    * @param rate How many smallest token units a buyer gets per wei
    * @param fundRaisingAddress Address where raised funds will be transfered if crowdsale is successful
    * @param tokenContractAddress ERC20Mintable contract address of the token being sold, already deployed
    * @param cap Cap on funds raised (maximum, hard cap)
    * @param goal Goal on funds raised (minimum, soft cap)
    * @param feeReceiverAddress Address that receives fees for contract deployment
    */
    constructor (
        uint256 openingTime,
        uint256 closingTime,
        uint256 rate,
        address fundRaisingAddress,
        ERC20Mintable tokenContractAddress,
        uint256 cap,
        uint256 goal,
        address feeReceiverAddress
    )
        public payable
        Crowdsale(rate, fundRaisingAddress, tokenContractAddress)
        CappedCrowdsale(cap)
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
