pragma solidity ^0.4.18;

import "./ERC721.sol";
import "./Base.sol";

contract Ownership is ERC721, Base {

    string public name = "CryptoTeam";
    string public symbol = "CT";

    function implementsERC721() public pure returns (bool) {
        return true;
    }

    function _owns(address _claimant, uint256 _tokenId) internal view returns (bool) {
        return playerIndexToOwner[_tokenId] == _claimant;
    }

    function _approvedFor(address _claimant, uint256 _tokenId) internal view returns (bool) {
        return playerIndexToApproved[_tokenId] == _claimant;
    }   

    function _approve(uint256 _tokenId, address _approved) internal notPaused {
        playerIndexToApproved[_tokenId] = _approved;
    }

    function balanceOf(address _owner) public view returns (uint256 count) {
        return ownershipTokenCount[_owner];
    }

    function transfer(address _to,uint256 _tokenId) public notPaused {
        require(_to != address(0) && _owns(msg.sender, _tokenId));
        _transfer(msg.sender, _to, _tokenId);
    }

    function approve(address _to, uint256 _tokenId) public notPaused {
        require(_owns(msg.sender, _tokenId));
        _approve(_tokenId, _to);
        Approval(msg.sender, _to, _tokenId);
    }

    function transferFrom(address _from, address _to, uint256 _tokenId) public notPaused {
        require(_approvedFor(msg.sender, _tokenId) && _owns(_from, _tokenId));
        _transfer(_from, _to, _tokenId);
    }

    function totalSupply() public view returns (uint) {
        return players.length;
    }



}