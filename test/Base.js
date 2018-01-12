var Base = artifacts.require("Base");
expect = require("chai").expect;

//Run truffle develop in another terminal before testing contracts

contract("Base", function (accounts) {

    let account = accounts[0];
    let account2 = accounts[1];
    const eq = assert.equal.bind(assert);

    it("Deploy Base.sol", async () => {
        BaseInstance = await Base.new();
    });

    it("Contract is assigned as the player's owner", async () => {
        await BaseInstance._spawnPlayer(301);
        let playerOwner = await BaseInstance.playerIndexToOwner.call(301);
        eq(playerOwner, BaseInstance.address, "Contract is not the spawned player's owner.")
    });


    /* 

    Cannot test an internal function

    it("Transfer a player from contract to a user", async () => {

        await BaseInstance._spawnPlayer.call(302);

        contractBalanceBefore = await BaseInstance.ownershipTokenCount.call(BaseInstance.address);
        receipientBalanceBefore = await BaseInstance.ownershipTokenCount.call(account2);

        await BaseInstance._transfer(BaseInstance.address, account2, 302);

        contractBalanceAfter = await BaseInstance.ownershipTokenCount.call(BaseInstance.address);
        receipientBalanceAfter = await BaseInstance.ownershipTokenCount.call(account2);

        eq(contractBalanceBefore - 1, contractBalanceAfter, 'Contract balance did not decrease after transfer');
        eq(receipientBalanceBefore, receipientBalanceAfter - 1, 'Receipient balance did not decrease after transfer');

    })

    */



});