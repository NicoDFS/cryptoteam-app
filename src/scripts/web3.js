var Web3 = require('web3');
var web3 = new Web3();

export default function Web3Init() {

    // Use Mist/MetaMask's provider
    if (typeof web3 !== 'undefined') {

        if (window.web3 !== undefined && window.web3.currentProvider !== undefined) {
            console.log('Connected to MetaMask provider,');
            return new Web3(window.web3.currentProvider)
        }
    }

    //no web3 provider detected, fallback to infura api
    console.log('Web3 could not detect MetaMask or Mist');
    return new Web3(new Web3.providers.HttpProvider('https://mainnet.infura.io/UtfyNlH8T3tTW1j6Nuoh'))

}


