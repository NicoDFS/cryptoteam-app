import React, { Component } from 'react'
import BenchItem from './BenchItem'
import { Row } from 'antd'

export default class Bench extends Component {
  render() {
    return (
      <Row type="flex" justify="center" >
        <BenchItem/>
      </Row>
    )
  }
}
