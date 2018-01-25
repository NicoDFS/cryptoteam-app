import React, { Component } from 'react'
import CustomContent from '../CustomContent/CustomContent'
import MarketContent from './MarketContent';

export default class MarketPage extends Component {
    render() {
        return (
            <CustomContent title="Marketplace"
                content={<MarketContent web3={this.props.web3} />} />
        )
    }
}
