import React, { Component } from 'react'
import './Dropdown.css'
import {Col} from 'antd'

export default class Item extends Component {
  render() {
    return (
      <a>
        <Col className="dropdownItem">
            {this.props.label}
        </Col>
      </a>
    )
  }
}
