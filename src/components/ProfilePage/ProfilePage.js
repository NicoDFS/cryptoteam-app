import React, { Component } from 'react'
import Bench from './Bench/Bench'
import CustomContent from '../CustomContent/CustomContent'
import { getUser } from '../../firebase/db'
import './ProfilePage.css'
import authenticate from '../../firebase/auth'
import NoResults from './NoResults'
import { CometSpinLoader } from 'react-css-loaders';
import NoSearchResults from '../Generic/NoSearchResults'
import { Row, Pagination } from 'antd'
import { chunk } from 'lodash';
import Filter from '../Generic/Filter/Filter'


let accent_clean = require('remove-accents');
let filters = ['Rating', 'Popularity'];
let web3;

export default class ProfilePage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      bench: [],
      bench_static: [],
      bench_split: [],
      cards_per_page: 10,
      current_page: 0,
      loaded: false,
      userAddress: '',
      no_results: false,
      no_search_results: false,
    }

    web3 = this.props.web3;
  }

  componentDidMount() {

    let address = web3.eth.accounts[0];
    authenticate(address, (err) => {
      if (!err) {
        this.getUserData(address);
      }
    })
  }

  getUserData(address) {

    getUser(address).then((userData) => {

      if (userData.owned) {

        let bench = [];

        // Getting players ids ( json keys )
        let playerIds = Object.keys(userData.owned);

        playerIds.forEach((playerId, index) => {
          // Using players ids to retrieve players data and add them to the bench
          bench.push(userData.owned[playerId]);

          // setting bench state after getting all players data
          if (index === playerIds.length - 1) {

            let bench_split = chunk(bench, this.state.cards_per_page);

            this.setState({
              bench: bench_split[0],
              bench_static: bench,
              bench_split: bench_split,
              loaded: true,
            });
          }
        });
        this.setState({ userAddress: address });
      } else {
        this.setState({ no_results: true, userAddress: address, loaded: true, });
      }
    });

  }

  updatePagination(pageNumber) {
    let cards = this.state.bench_split[pageNumber - 1];
    window.scrollTo(0, 85);
    this.setState({ bench: cards, current_page: pageNumber - 1 });
  }

  onShowSizeChange(number, size) {

    let bench = this.state.bench_static;
    let split = chunk(bench, size);

    this.setState({
      cards_per_page: size,
      bench_split: split,
      bench: split[number - 1]
    });
    window.scrollTo(0, 85);
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

    if (temp.length > 0) {
      let bench_split = chunk(temp, this.state.cards_per_page);
      this.setState({
        bench: bench_split[0],
        bench_split: bench_split
      });
    }
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

    if (temp.length > 0) {
      let bench_split = chunk(temp, this.state.cards_per_page);
      this.setState({
        bench: bench_split[0],
        bench_split: bench_split,
        no_search_results: false
      });
    }
    // no search results
    else {
      this.setState({ bench: [], no_search_results: true });
    }
    window.scrollTo(0, 85);
  }

  onSearchChange(searchTerm) {
    if (searchTerm === '' || searchTerm === ' ') {
      let bench = this.state.bench_split[this.state.current_page];
      this.setState({ bench: bench, no_search_results: false });
    }
  }

  render() {

    let no_results = null
    let no_search_results = null
    let filter = null

    if (this.state.no_results) {
      no_results = <NoResults />
    } else {

      filter = <Filter onSort={(e) => this.onSort(e)}
        onSearch={(e) => this.onSearch(e)}
        onSearchChange={(e) => this.onSearchChange(e)}
        filters={filters} />
    }

    if (this.state.no_search_results) {
      no_search_results = <NoSearchResults />
    }

    return (
      <CustomContent title="Bench"
        content={

          <div>

            {filter}

            <CometSpinLoader
              color="rgb(8, 45, 81)"
              size={50}
              style={{ display: !this.state.loaded ? 'block' : 'none', marginTop: 220 }}
            />

            <Row type="flex"
              justify="center">

              <Bench web3={this.props.web3} players={this.state.bench} />

              {no_results}
              {no_search_results}

            </Row>

            <Pagination showSizeChanger defaultCurrent={1}
              style={{
                marginBottom: 30,
                marginTop: 30,
                display: this.state.loaded && !this.state.no_results && !this.state.no_search_results ? 'block' : 'none'
              }}
              onShowSizeChange={(current, size) => this.onShowSizeChange(current, size)}
              total={this.state.bench_split.length * 10}
              pageSizeOptions={['15', '30', '40']}
              onChange={(number, size) => this.updatePagination(number, size)} />

          </div>
        } />
    )
  }
}
