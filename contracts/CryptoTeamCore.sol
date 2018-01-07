pragma solidity ^0.4.18;

contract CryptoTeamCore {

    address owner;
    address owner2;
    bool paused;
    
    mapping (address => uint256[]) playerOwnerships;
    //mapping (uint256 => address[]) forSale;

    event Transfer(address _from, address _to, uint256 _playerID);

    modifier onlyOwners(){
        require(msg.sender == owner || (msg.sender == owner2 && owner2 != address(0)));
        _;
    }

    modifier notPaused(){
        require(!paused);
        _;
    }

    function CryptoTeamCore() {
        paused = true;
        owner = msg.sender;
    }

    function _setOwner2(address _owner2) onlyOwners {
        owner2 = _owner2;
    }

    // Return all players owned by this user
    function _getOwnedPlayers(address _user) constant returns (uint256[]) {
        return playerOwnerships[_user];
    }

    // Return the number of players a user owns
    function _balanceOf(address _user) constant returns (uint256) {
        return playerOwnerships[_user].length;
    }

    // Whether or not a user owns a specific player
    function _owns(address _user, uint256 _playerID) notPaused constant returns  (bool, uint256) {

        uint256[] ownedPlayers = playerOwnerships[_user];
        
        for (uint i = 0; i < ownedPlayers.length; i++) {
        
            if (ownedPlayers[i] == _playerID) {
                return (true, i);
            }

        }
        
        return (false, 0);

    }

    /* Transfer a player from one user to another
        Find index of first occurence of the player in the owners players
        replace it with the last entry and then delete the last entry.
        Then append the ID to the receipient and call the event
    */
    function _transferTo(address _owner, address _receipient, uint256 _playerID) notPaused {
        
        var (owns, index) = _owns(_owner, _playerID);
        require(owns);
        uint256 length = playerOwnerships[_owner].length;
        playerOwnerships[_owner][index] = playerOwnerships[_owner][length - 1];
        delete  playerOwnerships[_owner][length - 1];
        playerOwnerships[_receipient].push(_playerID);

        Transfer(_owner, _receipient, _playerID);
    }

    function _buy(address _buyer, uint256 _playerID) notPaused {

    }

    function _ownerSell(uint256 _playerId, uint256 _price) notPaused {
        
    }

    function _ownerSellMultiple(uint256[] _playerIds, uint256[] _prices) notPaused {

        for (uint i = 0; i < _playerIds.length; i++) {
            _ownerSell(_playerIds[i], _prices[i]);
        }

    }

    //update pause state
    function _pauseState(bool _pause) onlyOwners {
        paused = _pause;
    }

    // Eth sent to the contract address will be considered a donation/tip
    function() payable {
        
        if (owner2 != address(0)) {
            owner.transfer(msg.value/2);
            owner2.transfer(msg.value/2);
        }  
        
        else {
            owner.transfer(msg.value);
        }
  
    }

}