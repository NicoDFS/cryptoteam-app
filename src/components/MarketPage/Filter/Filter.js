import React, { Component } from 'react'
import {Row} from 'antd'
import './Filter.css'
export default class Filter extends Component {
  render() {
    return (
      <Row className="filterContainer" type="flex" justify="left">
        <input placeholder="Search" className="input"/>
      </Row>
    )
  }
}
