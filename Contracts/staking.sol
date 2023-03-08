// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
error Staking__TransferFailed();
error Withdraw__TransferFailed();
error Staking__NeedsMoreThanZero();

contract Staking {
    IERC20 public s_stakingToken;
    IERC20 public s_interestToken;

    uint256 public constant INTEREST_RATE = 8;

    /** @dev Mapping from address to the amount the user has staked */
    mapping(address => uint256) public s_stakeBalances;

    /** @dev Mapping from address to the time a user has staked */
    mapping(address => uint256) public s_staketime;

    /** @dev Mapping from address to the amount the user has been rewarded */
    mapping(address => uint256) public s_userInterestPaidHistory;

    /** @dev Mapping from address to the interest claimable for user */
    mapping(address => uint256) public s_interestEarned;


    event stake_event(address indexed sender, string message);

    event claim_event(address indexed sender, string message);

    event withdraw_event(address indexed sender, string message);

    modifier updateReward(address account) {
        uint256 time_elapsed_since_last_calculation = block.timestamp - s_staketime[account];
        s_staketime[account] = block.timestamp;
        uint256 current_balance  = s_stakeBalances[account];
        uint256 interest_accrued  = ((INTEREST_RATE) * (current_balance * time_elapsed_since_last_calculation)/100);
        s_interestEarned[account] += interest_accrued;

        _;
    }

    modifier moreThanZero(uint256 amount) {
        if (amount == 0) {
            revert Staking__NeedsMoreThanZero();
        }
        _;
    }

    constructor(address stakingToken, address interestToken) {
        s_stakingToken = IERC20(stakingToken);
        s_interestToken = IERC20(interestToken);
    }

    function claimable() public view returns (uint256) {
        address account = msg.sender;
        uint256 time_elapsed_since_last_calculation = block.timestamp - s_staketime[account];
        uint256 current_balance  = s_stakeBalances[account];
        uint256 interest_accrued  = ((INTEREST_RATE) * (current_balance * time_elapsed_since_last_calculation)/100);
        uint256 claimable_value =  s_interestEarned[account]+interest_accrued;
        return claimable_value;
    }

     function earned() public view returns (uint256) {
       return s_userInterestPaidHistory[msg.sender];
    }

    function stake(uint256 amount) external updateReward(msg.sender) moreThanZero(amount) {
        // keep track of how much this user has staked
        // transfer the tokens to this contract
        s_stakeBalances[msg.sender] += amount;
        //emit event
        bool success = s_stakingToken.transferFrom(msg.sender, address(this), amount);
        if (!success) {
            revert Staking__TransferFailed();
        } else {
            emit stake_event(msg.sender, "Successfully staked!");
        }
    }

    function updateStakeTime(uint256 value) external{
        s_staketime[msg.sender] += value;
    }

    function withdraw(uint256 amount) external updateReward(msg.sender) moreThanZero(amount) {
        s_stakeBalances[msg.sender] -= amount;
        // emit event
        bool success = s_stakingToken.transfer(msg.sender, amount);
        if (!success) {
            revert Withdraw__TransferFailed();
        } else {
            emit withdraw_event(msg.sender, "Successfully withdrawn!");
        }
    }

    function claimReward() external updateReward(msg.sender) {
        uint256 reward = s_interestEarned[msg.sender];
        s_userInterestPaidHistory[msg.sender] += reward;
        s_interestEarned[msg.sender] = 0;
        bool success = s_interestToken.transfer(msg.sender, reward);
        if (!success) {
            revert Staking__TransferFailed();
        } else {
            emit claim_event(msg.sender, "Successfully claimed!");
        }
    }

    // Getter for UI
    function getStakedAccount(address account) public view returns (uint256) {
        return s_stakeBalances[account];
    }

    function getStaked() public view returns (uint256) {
        return s_stakeBalances[msg.sender];
    }
}
