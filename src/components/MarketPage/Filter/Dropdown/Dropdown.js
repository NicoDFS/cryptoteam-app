import React, { Component } from 'react'
import {Row, Col} from 'antd'
import Item from './Item'
import './Dropdown.css'
let items=[ 'price' ];


export default class DropDown extends Component {
  render() {
    return (
      <Row type="flex" justify="center" className="dropdownContainer" >
        <a>
          <Col span={24} className="toggleButton" >
            Sort by: <span className="activeTitle">Rating</span>
          </Col>
        </a>
        <Item  label="Price"/>
        <Item  label="Rating"/>
      </Row>
    )
  }
}
