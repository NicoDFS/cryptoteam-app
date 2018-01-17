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
            'market_static': []
        }
    }

    componentDidMount(){
        
        document.title = "Marketplace";

        getMarket().then((marketData) => {
            this.setState({'market':marketData, 'market_static': marketData});
        });
    }

    sortByIndex(index){

        let temp = this.state.market; 

        temp.sort((a, b) => {
           switch (index) {
                case 1: return a.price - b.price;                            //price ascending
                case 2: return b.price - a.price;                           //price descending
                case 3: return a.popularity - b.popularity;      //popularity descending (not ready yet)
                default: return b.rating - a.rating;                    //sort by rating (case 0)
            }
        });
        this.setState({market: temp});
    }

    searchWith(term){

        let temp = this.state.market_static;

        temp = temp.filter((a) => {
            return a.name.toLowerCase().indexOf(term.toLowerCase()) !== -1 ;
        });

        this.setState({market: temp});

    }

    render() {
        return (
            <div>

                <h1 className="title"> Marketplace</h1>
                <TabsBar />
                <Filter  market = {this}/>
               
                <Row type="flex" justify="center" className="cardsContainer" style={{}} >
                    {this.state.market.map((item, index) => (
                        <PriceCard key = {index} playerInfo={item} />
                    ))}
                </Row>

            </div>
        )
    }
}
