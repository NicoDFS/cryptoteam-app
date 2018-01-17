import React, { Component } from 'react'
import {Row} from 'antd'
import './Filter.css'
import Dropdown from './Dropdown/Dropdown'
export default class Filter extends Component {

  getSort( field ){
    console.log(field);
  }

  render() {
    return (
      <Row className="filterContainer" type="flex" justify="left">
        <input placeholder="Search" className="input"/>
        <Dropdown items={['Price','Rating']} title="Sort by: " onChange={this.getSort}/>
        <Dropdown items={['Lowest first','Highest first']} onChange={this.getSort}/>
      </Row>
    )
  }
}
