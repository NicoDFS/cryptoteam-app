import React, { Component } from 'react';
import ProfilePage from './ProfilePage'

import { Web3Provider } from 'react-web3';
import Web3Unavailable from '../Web3/Unavailable';
import NetworkUnavailable from '../Web3/NetworkUnavailable'

export default class ProfilePageAbstract extends Component {
    render() {

        let toRender = null
        let version = this.props.web3.version.network

        if (version === '1') {
            toRender = <ProfilePage web3={this.props.web3} />
        }

        else {
            toRender = <NetworkUnavailable />
        }

        // toRender = <ProfilePage web3={this.props.web3} />

        return (
            <Web3Provider
                web3UnavailableScreen={Web3Unavailable}
                accountUnavailableScreen={Web3Unavailable}>

                {toRender}

            </Web3Provider>
        )
    }
};
