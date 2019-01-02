pragma solidity ^0.4.24;

import "../open-zeppelin-contracts/token/ERC20/IERC20.sol";
import "../open-zeppelin-contracts/crowdsale/validation/CappedCrowdsale.sol";
import "../open-zeppelin-contracts/crowdsale/emission/AllowanceCrowdsale.sol";
import "../open-zeppelin-contracts/crowdsale/distribution/RefundablePostDeliveryCrowdsale.sol";

contract CARPDCrowdsale is CappedCrowdsale, AllowanceCrowdsale, RefundablePostDeliveryCrowdsale {
    constructor (
        uint256 openingTime,
        uint256 closingTime,
        uint256 rate,
        address wallet,
        IERC20 token,
        uint256 cap,
        uint256 goal,
        address tokenWallet
    )
        public
        Crowdsale(rate, wallet, token)
        CappedCrowdsale(cap)
        AllowanceCrowdsale(tokenWallet)
        TimedCrowdsale(openingTime, closingTime)
        RefundableCrowdsale(goal)
    {}
}
