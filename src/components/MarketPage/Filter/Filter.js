import React, { Component } from 'react'
import { Row } from 'antd'
import './Filter.css'
import Dropdown from './Dropdown/Dropdown'

export default class Filter extends Component {

  constructor() {
    super();
    this.state = {
      filters: ['Rating', 'Price ascending', 'Price descending', 'Popularity'],
      activeIndex: 0
    }
  }

  sortMarket(e) {
    let index = this.state.filters.indexOf(e);
    this.props.market.sortByIndex(index);
    this.setState({ activeIndex: index });
  }

  searchMarket(e) {
    let searchTerm = e.target.value;
    this.props.market.searchWith(searchTerm);
  }

  render() {
    return (

      <Row className="filterContainer" type="flex" justify="left">
        <input placeholder="Search" className="input" onChange={(e) => this.searchMarket(e)} />
        <Dropdown items={this.state.filters}
          title="Sort by: " onChange={(e) => this.sortMarket(e)} />
      </Row >
    )
  }
}
