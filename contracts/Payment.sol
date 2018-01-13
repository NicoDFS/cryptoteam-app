pragma solidity ^0.4.18;

contract Payment {

    address owner = msg.sender;
    bool paused = false;

    event Buy(address indexed _seller, address indexed _buyer, uint256 _price);
    event Transfer(address indexed _from, address indexed _to, uint256 _amount);

    modifier onlyOwner(){
        require(msg.sender == owner);
        _;
    }

    modifier notPaused() {
        require(!paused);
        _;
    }
    
    function buyFromContract(uint256 _expectedAmount) public payable notPaused {

            require(_expectedAmount == msg.value && msg.value != 0);
            owner.transfer(msg.value);

            // Broadcast events
            Buy(address(this), msg.sender, msg.value);
            Transfer(address(this), msg.sender, msg.value);
    }

    function buyFromUser(uint _expectedAmount, address seller) public payable notPaused {

        require(_expectedAmount == msg.value && msg.value != 0);
        
        uint256 fee = (25 * msg.value)/10000;
        uint256 sellerFunds = msg.value - fee;

        seller.transfer(sellerFunds);
        owner.transfer(fee);

        // Broadcast events
        Transfer(msg.sender, seller, sellerFunds);
        Transfer(msg.sender, address(this), fee);
        Buy(seller, msg.sender, msg.value);
    
    }

    function pause(bool _pauseState) public onlyOwner {
        paused = _pauseState;
    }

    function() public payable {
        owner.transfer(msg.value);
    }

}