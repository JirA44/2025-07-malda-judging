### Solution: Enforce maxFee and ttl Parameters in sendMsg Function

#### Approach:

The solution involves adding validation checks to ensure that `maxFee` and `ttl` parameters are set to 0 before passing them to the `everclearFeeAdapter.newIntent` function.

#### Code Changes:
```solidity
// Rebalance/EverclearBridge.sol (modified)

contract EverclearBridge is RebalancerBridge {
    // ...

    function sendMsg(
        uint256 params.maxFee,
        uint256 params.ttl,
        address recipientAddress,
        uint256 amount
    ) public virtual override {
        // Add validation checks for maxFee and ttl parameters
        require(params.maxFee == 0, "maxFee must be 0");
        require(params.ttl == 0, "ttl must be 0");

        // Pass validated parameters to everclearFeeAdapter.newIntent
        _everclearFeeAdapterNewIntent(
            recipientAddress,
            amount,
            uint256(10**18 - params.maxFee),
            params.ttl
        );
    }
}
```

#### Explanation:

In the modified `sendMsg` function, we added two `require` statements to validate that `maxFee` and `ttl` parameters are set to 0. If either of these conditions is not met, the function will revert with an error message indicating the required values.

We then pass the validated parameters to the `_everclearFeeAdapterNewIntent` function, which is assumed to be a safe and well-tested implementation.

#### Dependencies:

* The modified contract code remains the same as in the original bounty description.

### Commit Message:
```
fix: Enforce maxFee and ttl Parameters in sendMsg Function

Add validation checks for maxFee and ttl parameters to prevent misrouting intents
to the unsupported solver pathway.
```