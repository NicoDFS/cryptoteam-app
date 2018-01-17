import React, { Component } from 'react'
import { Row } from 'antd'
import './Filter.css'
import Dropdown from './Dropdown/Dropdown'

export default class Filter extends Component {

  constructor(props) {
    super(props)

    this.state = {
      sortBy: 'rating'
    }
  }


  render() {
    return (

      <Row className="filterContainer" type="flex" justify="left">
        <input placeholder="Search" className="input" />

        <Dropdown items={['Rating', 'Price ascending', 'Popularity', 'Price descending']}
          title="Sort by: " onChange={this.props.sortBy} />

      </Row>
    )
  }
}
