import React, { Component } from 'react';
import { Row } from 'antd';
import PriceCard from './PriceCard'
import './MarketPage.css'
import TabsBar from './TabsBar/TabsBar'
import Filter from './Filter/Filter'
import { getMarket } from '../../firebase/db'


export default class MarketPage extends Component {
    constructor(){
        super();
        this.state = {
            'market':[],
        }
    }

    componentDidMount(){
        getMarket().then((marketData) => {
            this.setState({'market':this.sortByKey(marketData,'rating')});
        });
    }

    callback(key) {
        console.log(key);
    }

    sortByKey(array, key) {
        return array.sort(function (a, b) {
            var x = a[key]; var y = b[key];
            return ((x > y) ? -1 : ((x < y) ? 1 : 0));
        });
    }

    render() {
        return (
            <div>
                <h1 className="title"> Marketplace</h1>
                <TabsBar />
                <Filter/>
                <Row type="flex" justify="center" className="cardsContainer" style={{}} >
                    {this.state.market.map((item, index) => (
                        // always add key to iterator
                        <PriceCard key = {index} playerInfo={item} />
                    ))}
                </Row>
            </div>
        )
    }
}
