import React, { Component } from 'react'
import {Row} from 'antd'
import './Filter.css'
import DropDown from './Dropdown/Dropdown'
export default class Filter extends Component {
  render() {
    return (
      <Row className="filterContainer" type="flex" justify="left">
        <input placeholder="Search" className="input"/>
        {/* <p className="filterTitle" >Sort By</p> */}
        <DropDown/>
      </Row>
    )
  }
}
