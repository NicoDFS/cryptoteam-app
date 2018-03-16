import React, { Component } from 'react'
import './Dropdown.css'

export default class Item extends Component {
  constructor() {
    super();
    this.returnSelf = this.returnSelf.bind(this);
    this.state = {
      label: "",
    }
  }

  componentDidMount() {
    this.setState({ label: this.props.label });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ label: nextProps.label });
  }

  returnSelf() {
    this.props.onClick(this.state.label);
  }

  render() {
    return (
      <a onClick={() => this.returnSelf()} className="dropdownItem">
        <p className="dropdownText" >{this.state.label}</p>
      </a>
    )
  }
}
