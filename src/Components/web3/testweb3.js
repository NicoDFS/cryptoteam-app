import React, { Component } from 'react';
import Web3Init from '../../scripts/web3_init';

export default class Web3Test extends Component {

    componentDidMount() {

        let web3 = Web3Init()
        console.log(web3);

    }

    render() {
        return (
            <div>
                Web3 object printed in console
            </div>
        )
    }
}
