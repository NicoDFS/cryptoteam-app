import React, { Component } from 'react'
import { Row } from 'antd'
import './Filter.css'
import Dropdown from './Dropdown/Dropdown'

export default class Filter extends Component {

  constructor() {
    super();
    this.sortKey = 'rating';
    this.sortDir = 'dsc';
    this.setSortKey = this.setSortKey.bind(this);
    this.setSortDir = this.setSortDir.bind(this);
  }

  setSortKey(key) {
    this.sortKey = key.toLowerCase();
    this.sortMarket();
  }

  setSortDir(dir) {
    if (dir === "Highest first") {
      this.sortDir = 'dsc';
    } else {
      this.sortDir = 'asc';
    }
    this.sortMarket();
  }

  sortMarket() {
    this.props.market.sortByKey(this.sortKey, this.sortDir);
  }


  render() {
    return (

      <Row className="filterContainer" type="flex" justify="left">

        <input placeholder="Search" className="input" />
        <Dropdown items={['Rating', 'Price ascending', 'Popularity', 'Price descending']}
          title="Sort by: " onChange={this.setSortDir} />

      </Row >
    )
  }
}
