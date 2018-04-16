import React, { Component } from 'react'
import CustomContent from '../CustomContent/CustomContent'
import MarketAbstract from './MarketAbstract'
// import MarketContent from './MarketContent';


export default class MarketPage extends Component {
    render() {
        return (
            <CustomContent title="Marketplace"
                content={<MarketAbstract web3={this.props.web3} />}
                account={this.props.web3.eth.accounts[0]}
            />
        )
    }
}
