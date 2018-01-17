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
            this.setState({'market':marketData});
            this.refs.filter.sortMarket();
        });
    }

    callback(key) {
        console.log(key);
    }

    sortByKey( key, dir ) {
        let temp = this.state.market;
        temp.sort(function (a, b) {
                var x = a[key]; var y = b[key];
                if(dir === 'dsc' ){
                    return ((x > y) ? -1 : ((x < y) ? 1 : 0));
                }else{
                    return ((x < y) ? -1 : ((x > y) ? 1 : 0));
                }
        });
        this.setState({'market':temp});
    }

    render() {
        return (
            <div>
                <h1 className="title"> Marketplace</h1>
                <TabsBar />
                <Filter ref='filter' market={this} />
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
