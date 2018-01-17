pragma solidity ^0.4.18;

import "./AccessControl.sol";

contract Base is AccessControl {

    struct Player {
        uint256 id;
    }

    event Transfer(address indexed from, address indexed to, uint256 indexed tokenId);
    event Spawn(uint256 playerId);

    Player[] public players;

    // Returns the owner of a specific player given his ID
    mapping (uint256 => address) public playerIndexToOwner;

    // Returns the number of players a user owns
    mapping (address => uint256) ownershipTokenCount;

    //A mapping from playerIDs to an address that has been approved to call
    // transferFrom(). Each player can only have one approved address for transfer
    mapping (uint256 => address) public playerIndexToApproved;

    function _transfer(address _from, address _to, uint256 _tokenId) internal {
        
        ownershipTokenCount[_to]++;
        playerIndexToOwner[_tokenId] = _to;

        if (_from != address(0)) {
            ownershipTokenCount[_from]--;
            delete playerIndexToApproved[_tokenId];
        }

        Transfer(_from, _to, _tokenId);
}

    function _spawnPlayer(uint256 id) external {
        require(playerIndexToOwner[id] == address(0));
        players.push(Player(id));
        playerIndexToOwner[id] = address(this);
        Spawn(id);
    }

    // function() payable {

    // }

}