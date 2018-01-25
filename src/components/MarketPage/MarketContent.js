// Base components
import React, { Component } from 'react';
import { Row, Pagination } from 'antd';
import { CometSpinLoader } from 'react-css-loaders';
import { Web3Provider } from 'react-web3';
import PriceCard from './PriceCard'
import TabsBar from './TabsBar/TabsBar'
import Filter from './Filter/Filter'
import Web3Unavailable from '../Web3/Unavailable';

// Tools
import { chunk } from 'lodash';

// Firebase
import firebase from '../../firebase'
import { getMarket } from '../../firebase/db'
import authenticate from '../../firebase/auth'

//CSS
import './MarketContent.css'

//Other
let web3;
let accent_clean = require('remove-accents');


export default class MarketContent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            market: [],
            market_static: [],
            market_split: [],
            cards_per_page: 10,
            current_page: 0,
            loaded: false,
            user: '',
            height: 0
        }
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }

    updateWindowDimensions() {
        this.setState({ width: window.innerWidth });
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    componentDidMount() {

        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);

        document.title = "Marketplace";

        getMarket().then((marketData) => {

            web3 = this.props.web3;
            let market_split = chunk(marketData, this.state.cards_per_page);

            this.setState({
                market: market_split[0],
                market_static: marketData,
                market_split: market_split
            });

            this.sortByIndex(0);

            let address = web3.eth.accounts[0];
            authenticate(address)
        });

        //sign in the user and disable loader
        firebase
            .auth()
            .onAuthStateChanged((user) => {

                if (user) {
                    // console.log(user.uid);
                    this.setState({ loaded: true, user: user.id });
                }

            });
    }

    sortByIndex(index) {

        let temp = this.state.market_static;

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
        let market_split = chunk(temp, this.state.cards_per_page);

        this.setState({
            market: market_split[0],
            market_split: market_split
        });
    }

    searchWith(term) {

        let temp = this.state.market_static;

        temp = temp.filter((a) => {
            return accent_clean(a.name.toLowerCase())
                .indexOf(term.toLowerCase()) !== -1 ||
                a.name.toLowerCase()
                    .indexOf(term.toLowerCase()) !== -1
        });

        let market_split = chunk(temp, this.state.cards_per_page);

        this.setState({
            market: market_split[0],
            market_split: market_split
        });

        window.scrollTo(0, 85);
    }

    checkSearchField(searchTerm) {
        if (searchTerm === '' || searchTerm === ' ') {
            let market = this.state.market_split[this.state.current_page];
            this.setState({ market: market });
        }
    }

    updatePagination(pageNumber) {
        let cards = this.state.market_split[pageNumber - 1];
        window.scrollTo(0, 85);
        this.setState({ market: cards, current_page: pageNumber - 1 });
    }

    onShowSizeChange(number, size) {

        let market = this.state.market_static;
        let split = chunk(market, size);

        this.setState({
            cards_per_page: size,
            market_split: split,
            market: split[number - 1]
        });
        window.scrollTo(0, 85);
    }


    render() {
        return (

            <Web3Provider
                web3UnavailableScreen={Web3Unavailable}
                accountUnavailableScreen={Web3Unavailable}>

                {/* <TabsBar /> */}
                <Filter market={this} />

                <CometSpinLoader
                    color="#ED1C24"
                    size={50}
                    style={{ display: !this.state.loaded ? 'block' : 'none' }} />

                <Row
                    type="flex"
                    justify="center"
                    style={{width:(this.state.width-100)}}
                    className={this.state.loaded ? 'cardsContainer' : 'cardsContainer hidden'}>

                    {this.state.market.map((item, index) => (

                        <PriceCard
                            web3={web3}
                            style={{ display: this.state.loaded ? 'block' : 'none' }}
                            key={index}
                            playerInfo={item} />
                    ))}

                </Row>

                <Pagination showSizeChanger  defaultCurrent={1} 
                    style={{marginBottom:30}}
                    onShowSizeChange={(current, size) => this.onShowSizeChange(current, size)}
                    total={this.state.market_split.length * 10}
                    pageSizeOptions={['15', '30', '40']}
                    onChange={(number, size) => this.updatePagination(number, size)} />

            </Web3Provider >

        )
    }
}
