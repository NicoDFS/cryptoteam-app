pragma solidity ^0.4.18;

contract AccessControl {

    bool public paused = false;
    address owner = msg.sender;
    address owner2;

    modifier onlyOwners(){
        require(msg.sender == owner || (msg.sender == owner2 && owner2 != address(0)));
        _;
    }

    modifier notPaused() {
        require(!paused);
        _;
    }

    function pauseState(bool _pause) public onlyOwners {
        paused = _pause;
    }

}