import React, { Component } from 'react';
import BenchItem from './BenchItem';
import { Row } from 'antd';
import { Web3Provider } from 'react-web3';
import Web3Unavailable from '../../Web3/Unavailable';
import Filter from '../../Generic/Filter/Filter'
import { chunk } from 'lodash';
let accent_clean = require('remove-accents');

let filters = ['Rating', 'Popularity'];

export default class Bench extends Component {

    constructor() {
        super();
        this.state = {
            bench_static: [],
            bench: [],
        }
    }

    componentDidMount() {
        this.setState({ bench_static: this.props.players, bench: this.props.players });
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ bench_static: this.props.players, bench: nextProps.players });
    }

    onSort(index) {
        let temp = this.state.bench_static;
        temp.sort((a, b) => {
            switch (index) {
                case 1:
                    return a.info.popularity - b.info.popularity; //popularity descending (not ready yet)
                default:
                    return b.info.rating - a.info.rating; //sort by rating (case 0)
            }
        });

        this.setState({ bench: temp });

        // if (temp.length > 0) {
        //     let market_split = chunk(temp, this.state.cards_per_page);
        //     this.setState({
        //         market: market_split[0],
        //         market_split: market_split
        //     });
        // }
    }

    onSearch(term) {
        let temp = this.state.bench_static;

        temp = temp.filter((a) => {
            return accent_clean(a.info.name.toLowerCase())
                .indexOf(term.toLowerCase()) !== -1 ||
                a.info.name.toLowerCase()
                    .indexOf(term.toLowerCase()) !== -1
        });

        this.setState({ bench: temp });

        // if (temp.length > 0) {
        //     let market_split = chunk(temp, this.state.cards_per_page);
        //     this.setState({
        //         market: market_split[0],
        //         market_split: market_split,
        //         no_results: false
        //     });
        // }
        // // no search results
        // else {
        //     this.setState({ market: [], no_results: true });
        // }
        // window.scrollTo(0, 85);
    }

    onSearchChange(searchTerm) {
        if (searchTerm === '' || searchTerm === ' ') {
            // let market = this.state.market_split[this.state.current_page];
            this.setState({ bench: this.state.bench_static, no_results: false });
        }
    }

    render() {
        return (

            <Web3Provider
                web3UnavailableScreen={Web3Unavailable}
                accountUnavailableScreen={Web3Unavailable}>

                <div>
                    <Filter onSort={(e) => this.onSort(e)}
                        onSearch={(e) => this.onSearch(e)}
                        onSearchChange={(e) => this.onSearchChange(e)}
                        filters={filters} />

                    {/* <p className="benchCount">12 Players</p> */}
                    <Row type="flex" justify="center" >
                        {this.state.bench.map((item, index) => (
                            <BenchItem web3={this.props.web3}
                                key={index}
                                player={item} />
                        ))}
                    </Row>
                </div>

            </Web3Provider>
        )
    }
}
