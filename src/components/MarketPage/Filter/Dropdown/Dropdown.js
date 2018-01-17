import React, { Component } from 'react'
import {Row, Col} from 'antd'
import Item from './Item'
import './Dropdown.css'
let items=[ 'price' ];
let arrowIcon = require('../../../../assets/icons/down-arrow.png');

export default class DropDown extends Component {
  constructor(){
    super();
    this.state = {
      'opened':false,
    }
  }

  toggle(){
    this.setState({'opened':!this.state.opened});
  }

  render() {
    return (
      <Row type="flex" justify="center" className={this.state.opened ? "dropdownContainer opened" : "dropdownContainer"} >
        <a className="toggleButton" onClick={() => this.toggle()}>
           <p className="dropdownText"> Sort by: <span className="activeTitle">Rating</span></p>
           <img className="arrowIcon" src={arrowIcon} />
        </a>
        <Item  label="Price"/>
        <Item  label="Rating"/>
      </Row>
    )
  }
}
