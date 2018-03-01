import React, { Component } from 'react'
import { Row } from 'antd'
import Item from './Item'
import './Dropdown.css'
let arrowIcon = require('../../../../assets/icons/down-arrow.png');

export default class Dropdown extends Component {
  constructor() {
    super();
    this.state = {
      'opened': false,
      'activeItem': '',
    }
    this.items = [];
    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
    if (this.props.items) {
      this.items = this.props.items;
      this.setState({ 'activeItem': this.items[0] });
    }
    this.onItemClick = this.onItemClick.bind(this);
  }

  setWrapperRef(node) {
    this.wrapperRef = node;
  }

  handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      console.log('fff');
    }
  }

  getActiveItem() {
    return this.state.activeItem;
  }

  toggle() {
    if (this.items.length > 0) {
      this.setState({ 'opened': !this.state.opened });
    }
  }

  onItemClick(itemName) {
    if (itemName !== this.state.activeItem) {
      this.props.onChange(itemName);
      this.setState({ 'activeItem': itemName });
    }
    this.toggle();
  }

  render() {
    return (
      <Row type="flex" justify="center" className={this.state.opened ? "dropdownContainer opened" : "dropdownContainer"} >
        <a className="toggleButton" onClick={() => this.toggle()}>
          <p className="dropdownText">{this.props.title}<span className="activeTitle">{this.state.activeItem}</span></p>
          <img className="arrowIcon" src={arrowIcon} alt="" />
        </a>
        {/* <Item onClick={this.onItemClick} label="Price"/>
        <Item onClick={this.onItemClick} label="Rating"/> */}
        {this.items.map((item, index) => (
          <Item key={index} onClick={this.onItemClick} label={item} />
        ))}
      </Row>
    )
  }
}
