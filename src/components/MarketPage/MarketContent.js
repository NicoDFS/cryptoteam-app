// Base components
import React, { Component } from 'react';
import { Row, Pagination } from 'antd';
import { CometSpinLoader } from 'react-css-loaders';
import { Web3Provider } from 'react-web3';
import Web3Unavailable from '../Web3/Unavailable';
import PriceCard from './PriceCard'
import Filter from '../Generic/Filter/Filter'
import NoSearchResults from '../Generic/NoSearchResults';

// Tools
import { chunk } from 'lodash';

// Firebase
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
            no_results: false,
            current_page: 0,
            loaded: false,
            user: '',
            width: window.innerWidth,
            height: 0
        }
        this.removeOffer = this.removeOffer.bind(this);
        this.updateOffer = this.updateOffer.bind(this);
    }

    componentDidMount() {


        document.title = "Marketplace";
        web3 = this.props.web3;
        let address = web3.eth.accounts[0];

        //authenticate before getting market data
        authenticate(address, (err) => {

            if (!err) {

                getMarket().then((market) => {
                    if (market) {

                        let marketData = [];

                        let offerIds = Object.keys(market);
                        offerIds.forEach((offerId, index) => {

                            let offer = market[offerId];
                            offer.id = offerId;
                            marketData.push(offer);

                            if (index === offerIds.length - 1) {
                                let market_split = chunk(marketData, this.state.cards_per_page);

                                this.setState({
                                    market: market_split[0],
                                    market_static: marketData,
                                    market_split: market_split,
                                    loaded: true,
                                    user: address
                                });

                                this.onSort(0);
                            }
                        });
                    }
                });

            }
        })

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

    removeOffer(index) {
        let updatedMarket = this.state.market;
        updatedMarket.splice(index, 1);
        this.setState({ market: updatedMarket });
    }

    updateOffer(index, newPrice) {
        let updatedMarket = this.state.market;
        updatedMarket[index].price = newPrice;
        this.setState({ market: updatedMarket });
    }

    onSort(index) {
        let temp = this.state.market_static;

        this.state.market_static.sort((a, b) => {
            switch (index) {
                case 1:
                    return a.price - b.price; //price ascending
                case 2:
                    return b.price - a.price; //price descending
                case 3:
                    return a.player.popularity - b.player.popularity; //popularity descending (not ready yet)
                case 4:
                    return (b.player.info.rating / b.price) - (a.player.info.rating / a.price) //price:rating ratio
                default:
                    return b.player.info.rating - a.player.info.rating; //sort by rating (case 0)
            }
        });

        if (temp.length > 0) {
            let market_split = chunk(temp, this.state.cards_per_page);
            this.setState({
                market: market_split[0],
                market_split: market_split
            });
        }
    }

    onSearch(term) {
        let temp = this.state.market_static;

        temp = temp.filter((a) => {
            return accent_clean(a.player.info.name.toLowerCase())
                .indexOf(term.toLowerCase()) !== -1 ||
                a.player.info.name.toLowerCase()
                    .indexOf(term.toLowerCase()) !== -1
        });

        if (temp.length > 0) {
            let market_split = chunk(temp, this.state.cards_per_page);
            this.setState({
                market: market_split[0],
                market_split: market_split,
                no_results: false
            });
        }
        // no search results
        else {
            this.setState({ market: [], no_results: true });
        }
        window.scrollTo(0, 85);
    }

    onSearchChange(searchTerm) {
        if (searchTerm === '' || searchTerm === ' ') {
            let market = this.state.market_split[this.state.current_page];
            this.setState({ market: market, no_results: false });
        }
    }


    render() {

        let no_results = null

        if (this.state.no_results) {
            no_results = <NoSearchResults />
        }

        return (

            <Web3Provider
                web3UnavailableScreen={Web3Unavailable}
                accountUnavailableScreen={Web3Unavailable}>

                <Filter onSort={(e) => this.onSort(e)}
                    onSearch={(e) => this.onSearch(e)}
                    onSearchChange={(e) => this.onSearchChange(e)}
                    filters={['Rating', 'Price ascending', 'Price descending', 'Popularity', 'Price to rating ratio']} />

                <CometSpinLoader
                    color="#0082FF"
                    size={50}
                    style={{ display: !this.state.loaded ? 'block' : 'none', marginTop: 220 }}
                />

                <Row
                    type="flex"
                    justify="center"
                    style={{ paddingLeft: '4%', paddingRight: '4%' }}
                    className={this.state.loaded ? 'cardsContainer' : 'cardsContainer hidden'}>
                    {this.state.market.map((item, index) => (

                        < PriceCard
                            web3={web3}
                            style={{ display: this.state.loaded ? 'block' : 'none' }}
                            key={index}
                            index={index}
                            offerId={item.id}
                            seller={item.seller}
                            playerInfo={item.player}
                            price={item.price}
                            owned={item.seller === this.state.user ? true : false}
                            removeOffer={this.removeOffer}
                            updateOffer={this.updateOffer}
                        />
                    ))}
                    {no_results}
                </Row>

                <Pagination showSizeChanger defaultCurrent={1}
                    style={{
                        marginBottom: 30,
                        display: this.state.loaded && !this.state.no_results ? 'block' : 'none'
                    }}
                    onShowSizeChange={(current, size) => this.onShowSizeChange(current, size)}
                    total={this.state.market_split.length * 10}
                    pageSizeOptions={['15', '30', '40']}
                    onChange={(number, size) => this.updatePagination(number, size)} />

            </Web3Provider >

        )
    }
}
