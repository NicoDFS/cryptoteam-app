import React, { Component } from 'react';
import { Row } from 'antd';
import { CometSpinLoader } from 'react-css-loaders';
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
            'market_static': [],
            'loaded': false
        }
    }

    componentDidMount(){
        
        document.title = "Marketplace";

        getMarket().then((marketData) => {
            this.setState({'market':marketData, 'market_static': marketData});
            this.sortByIndex(0);
            this.setState({loaded: true})
        });
    }

    sortByIndex(index){

        let temp = this.state.market; 

        temp.sort((a, b) => {
           switch (index) {
                case 1: return a.price - b.price;                            //price ascending
                case 2: return b.price - a.price;                           //price descending
                case 3: return a.popularity - b.popularity;      //popularity descending (not ready yet)
                case 4: return (b.rating/b.price) - (a.rating/a.price)      //price:rating ratio
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

                <CometSpinLoader color="#68cc9c" size={50}
                    style={{ display: !this.state.loaded ? 'block' : 'none' }} />
                
               <div style={{ display: this.state.loaded ? 'block' : 'none' }}>
                <TabsBar />
                <Filter  market = {this}/>
               
                <Row type="flex" justify="center" className="cardsContainer" style={{}} >
                    {this.state.market.map((item, index) => (
                        <PriceCard key = {index} playerInfo={item} />
                    ))}
                </Row>
                </div>

            </div>
        )
    }
}
