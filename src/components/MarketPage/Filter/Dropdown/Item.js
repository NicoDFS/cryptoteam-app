import React, { Component } from 'react'
import './Dropdown.css'

export default class Item extends Component {
  constructor(){
    super();
    this.returnSelf = this.returnSelf.bind(this);
  }

  returnSelf(){
    this.props.onClick(this.props.label);
  }

  render() {
    return (
      <a onClick={() => this.returnSelf()} className="dropdownItem">
            <p className="dropdownText" >{this.props.label}</p>
      </a>
    )
  }
}
