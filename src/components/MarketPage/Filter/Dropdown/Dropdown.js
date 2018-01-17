import React, { Component } from 'react'
import {Row, Col} from 'antd'
import Item from './Item'
import './Dropdown.css'
let arrowIcon = require('../../../../assets/icons/down-arrow.png');

export default class Dropdown extends Component {
  constructor(){
    super();
    this.state = {
      'opened':false,
      'activeItem':'', 
    }
    this.items = [];
  }

  componentDidMount(){
    if(this.props.items){
      this.items = this.props.items;
      console.log(this.items);
      this.setState({'activeItem':this.items[0]});
    }
    this.onItemClick = this.onItemClick.bind(this);
  }

  toggle(){
    if(this.items.length>0){
      this.setState({'opened':!this.state.opened});
    }
  }

  onItemClick( itemName ){
    if(itemName != this.state.activeItem){
      this.props.onChange(itemName); 
      this.setState({'activeItem':itemName}); 
    }
    this.toggle();
  }

  render() {
    return (
      <Row type="flex" justify="center" className={this.state.opened ? "dropdownContainer opened" : "dropdownContainer"} >
        <a className="toggleButton" onClick={() => this.toggle()}>
           <p className="dropdownText">{this.props.title}<span className="activeTitle">{this.state.activeItem}</span></p>
           <img className="arrowIcon" src={arrowIcon} />
        </a>
        {/* <Item onClick={this.onItemClick} label="Price"/>
        <Item onClick={this.onItemClick} label="Rating"/> */}
        {this.items.map((item, index) => (
            <Item  key={index} onClick={this.onItemClick} label={item} />
        ))}
      </Row>
    )
  }
}
