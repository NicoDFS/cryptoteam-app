import React, { Component } from 'react'
import './Dropdown.css'
import {Col} from 'antd'

export default class Item extends Component {
  render() {
    return (
      <a className="dropdownItem">
            <p className="dropdownText" >{this.props.label}</p>
      </a>
    )
  }
}
