import React, { Component } from 'react'
import { Button } from 'antd';
import { Web3Provider } from 'react-web3';
import Web3Unavailable from '../components/Web3/Unavailable';

export default class Web3Test extends Component {

    sendTransaction() {

        let web3 = this.props.web3;

        // Works!
        web3.eth.sendTransaction({
            from: web3.eth.accounts[0],
            to: web3.eth.accounts[0],
            value: web3.toWei(0.5, 'ether'),
            data: null
        }, function (err, txHash) {
            console.log(err)
            console.log(txHash)
        })
    }

    render() {
        return (
            // <Web3Provider>
            //     <Button onClick={() => this.sendTransaction()}>Click me to send ETH!</Button>
            // </Web3Provider>
            <Web3Unavailable />
        )
    }
}
