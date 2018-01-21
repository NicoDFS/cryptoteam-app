// Base components
import React, { Component } from 'react';
import { Row } from 'antd';
import { CometSpinLoader } from 'react-css-loaders';
import { Web3Provider } from 'react-web3';
import PriceCard from './PriceCard'
import TabsBar from './TabsBar/TabsBar'
import Filter from './Filter/Filter'
import Web3Unavailable from '../Web3/Unavailable';

// Firebase
import firebase from '../../firebase'
import { getMarket } from '../../firebase/db'
import authenticate from '../../firebase/auth'

//CSS
import './MarketPage.css'

//Other
import config from '../../config'
let web3;

export default class MarketPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            market: [],
            market_static: [],
            loaded: false,
            user: ''
        }
    }

    componentDidMount() {

        document.title = "Marketplace";

        getMarket().then((marketData) => {

            web3 = this.props.web3;

            this.setState({ market: marketData, market_static: marketData });
            this.sortByIndex(0);

            let address = web3.eth.accounts[0];
            authenticate(address)
        });

        //sign in the user and disable loader
        firebase
            .auth()
            .onAuthStateChanged((user) => {

                if (user) {
                    console.log(user.uid);
                    this.setState({ loaded: true, user: user.id });
                }

            });
    }

    sortByIndex(index) {

        let temp = this.state.market;

        temp.sort((a, b) => {
            switch (index) {
                case 1:
                    return a.price - b.price; //price ascending
                case 2:
                    return b.price - a.price; //price descending
                case 3:
                    return a.popularity - b.popularity; //popularity descending (not ready yet)
                case 4:
                    return (b.rating / b.price) - (a.rating / a.price) //price:rating ratio
                default:
                    return b.rating - a.rating; //sort by rating (case 0)
            }
        });
        this.setState({ market: temp });
    }

    searchWith(term) {

        let temp = this.state.market_static;

        temp = temp.filter((a) => {
            return a
                .name
                .toLowerCase()
                .indexOf(term.toLowerCase()) !== -1;
        });

        this.setState({ market: temp });

    }


    render() {
        return (

            <Web3Provider
                web3UnavailableScreen={Web3Unavailable}
                accountUnavailableScreen={Web3Unavailable}>

                <div>

                    <h1 className="title">
                        Marketplace
                    </h1>

                    <div>

                        <TabsBar />
                        <Filter market={this} />

                        <CometSpinLoader
                            color="#ED1C24"
                            size={50}
                            style={{ display: !this.state.loaded ? 'block' : 'none' }} />

                        <Row
                            type="flex"
                            justify="center"
                            className={this.state.loaded ? 'cardsContainer' : 'cardsContainer hidden'}>

                            {this.state.market.map((item, index) => (

                                <PriceCard
                                    web3={web3}
                                    style={{ display: this.state.loaded ? 'block' : 'none' }}
                                    key={index}
                                    playerInfo={item}
                                />))}

                        </Row>
                    </div>

                </div>
            </Web3Provider>
        )
    }
}
