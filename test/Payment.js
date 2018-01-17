var Payment = artifacts.require("Payment");

contract(Payment, (accounts) => {

    let account1 = accounts[0];
    let account2 = accounts[1];

    let initial_balance = web3.eth.getBalance(account1).toNumber();

    it('Deploy Payment.sol', async () => {
        PaymentInstance = await Payment.new();
    });

    // buy from contract:
    // make sure msg.value and arg are the same
    // make sure owner of contract gets all msg.value

    it('Buying works with msg.sender = amount sent', async () => {

        let amount = parseInt(web3.toWei('0.23', 'ether'));
        await PaymentInstance.buyFromContract(amount, { from: account2, value: amount });
        let newOwnerBalance = web3.eth.getBalance(account1).toNumber();
        assert.equal(newOwnerBalance, initial_balance + amount);
    });

    // it('Buying works with msg.sender != amount sent', async () => {

    //     let amount = parseInt(web3.toWei('0.23', 'ether'));
    //     await PaymentInstance.buyFromContract(amount, { from: account1, value: amount - 100 });
    // });

});