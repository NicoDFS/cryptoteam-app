/**
 * Checks whether a users wallet is unlocked and is on 
 * the mainnet network
 */

import React, { Component } from 'react';
import MarketContent from './MarketContent'
import NetworkUnavailable from '../Web3/NetworkUnavailable'
import { Web3Provider } from 'react-web3';
import Web3Unavailable from '../Web3/Unavailable';

export default class MarketAbstract extends Component {

    render() {

        let version = this.props.web3.version.network
        let toRender = null

        if (version === '1') {
            toRender = <MarketContent web3={this.props.web3} />
        }

        else {
            toRender = <NetworkUnavailable />
        }

        return (

            <Web3Provider
                web3UnavailableScreen={Web3Unavailable}
                accountUnavailableScreen={Web3Unavailable}>
                {toRender}
            </Web3Provider>

        )
    }
};
