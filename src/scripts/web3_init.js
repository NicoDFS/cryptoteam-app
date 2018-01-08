var Web3 = require('web3');
var web3 = new Web3();

export default function Web3Init() {

    // Use Mist/MetaMask's provider
    if (typeof web3 !== 'undefined') {

        console.log('Attempting to connect to metamask provider');

        // TODO: Change Infura provider to Metamask 
        return new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io/r5BXHFEB8kpYCrHeEySo"));
    }

    //no metamask installed/unlocked
    console.log('Web3 could not detect MetaMask or Mist');
    return undefined;

}
