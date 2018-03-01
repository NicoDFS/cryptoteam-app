import React, { Component } from 'react'
import { Row, Input } from 'antd'
import './Filter.css'
import Dropdown from './Dropdown/Dropdown'

const Search = Input.Search;

export default class Filter extends Component {

  constructor() {
    super();
    this.state = {
      activeIndex: 0
    }
  }

  componentDidMount() {
    this.setState({ filters: this.props.filters });
    this.props.onSort(0);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ filters: nextProps.filters });
  }

  sortByIndex(e) {
    let index = this.state.filters.indexOf(e);
    this.props.onSort(index);
  }

  searchWith(term) {
    this.props.onSearch(term);
  }

  checkSearchField(searchTerm) {
    this.props.onSearchChange(searchTerm.target.value);
  }

  render() {
    return (

      <Row className="filterContainer" type="flex" justify="end" >

        {/* Live search */}
        {/* <input placeholder="Search" className="input" onChange={(e) => this.searchMarket(e)} /> */}

        {/* Non-live search */}


        <Dropdown items={this.state.filters}
          title="Sort by: " onChange={(e) => this.sortByIndex(e)} />

        <Search placeholder="Search"
          className="input-ant"
          style={{ width: '24%', }}
          onChange={(e) => this.checkSearchField(e)}
          onSearch={value => this.searchWith(value)} />
      </Row >
    )
  }
}
